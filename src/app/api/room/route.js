import { NextResponse } from "next/server";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  uns,
  query,
  addDoc,
  where,
  getDocs,
  limit,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

// {peers : ["",""] , peersCount : 2 , caller : "peerId"}
export async function GET(request) {
  try {
    let queId = null;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ message: "id is requred" }, { status: 400 });
    console.log(searchParams.get("id"));

    const qq = query(collection(db, "que"), where("id", "==", id), limit(1));
    const check = await getDocs(qq);

    check.forEach((doc) => {
      queId = doc.id;
    });
    if (!queId)
      return NextResponse.json(
        { message: "you are not in the que", check: check.size },
        { status: 400 }
      );
    const ifInRoom = query(
      collection(db, "room"),
      where("peers", "array-contains", id),
      where("peersCount", "==", 1),
      limit(1)
    );
    const waitingInRoom = await getDocs(ifInRoom);
    let roomid = null;

    waitingInRoom.forEach((doc) => {
      roomid = { id: doc.id, doc: doc.data() };
    });
    if (roomid) {
      return NextResponse.json({
        message: "ok",
        roomId: roomid,
      });
    }

    const q = query(collection(db, "que"), where("id", "!=", id), limit(1));
    const querySnapshot = await getDocs(q);
    let remoteUser = null;
    querySnapshot.forEach((doc) => {
      remoteUser = { id: doc.id, data: doc.data() };
      console.log(doc.id, " => ", doc.data());
    });

    // if there is a remote user present

    if (remoteUser) {
      const que = collection(db, "room");
      const data = await addDoc(que, {
        peers: [id, remoteUser.data.id],
        peersCount: 2,
        caller: id,
      });

      await deleteDoc(doc(db, "que", queId));
      await deleteDoc(doc(db, "que", remoteUser.id));
      return NextResponse.json({
        message: "ok",
        roomId: data.id,
      });
    } else {
      // you aare the only waiting in the que

      const q = query(
        collection(db, "room"),
        where("peersCount", "==", 1),
        limit(1)
      );
      const roomQuerySnapshot = await getDocs(q);

      let roomID = null;
      roomQuerySnapshot.forEach((doc) => {
        roomID = { id: doc.id, data: doc.data() };
      });

      console.log("else", roomID);
      const room = collection(db, "room");

      if (roomID) {
        await updateDoc(doc(db, "room", roomID.id), {
          ...roomID.data,
          peers: [...roomID.data?.peers, id],
          peersCount: 2,
          caller: id,
        });

        await deleteDoc(doc(db, "que", queId));

        console.log("updated room");
        return NextResponse.json({
          message: "ok",
          roomId: roomID.id,
        });
      } else {
        console.log("else room");

        const data = await addDoc(room, {
          peers: [id],
          peersCount: 1,
          caller: id,
        });
        await deleteDoc(doc(db, "que", queId));
        return NextResponse.json({
          message: "ok",
          roomId: data.id,
        });
      }
    }
  } catch (err) {
    return NextResponse.json({ err: err.message });
  }
}
