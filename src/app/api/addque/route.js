import { NextResponse } from "next/server";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  query,
  addDoc,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "id is requred" }, { status: 400 });

    const q = query(collection(db, "que"), where("id", "==", id), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size >= 1)
      return NextResponse.json(
        { message: "already in a que", code: 1 },
        { status: 201 }
      );

    const que = collection(db, "que");
    await addDoc(que, {
      id: id,
    });
    return NextResponse.json(
      { message: "added to a que", code: 1 },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ err: err.message, code: 0 }, { status: 500 });
  }
}
