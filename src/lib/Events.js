export const Events = {
  CONNECTPEER: "connectPeeer",
  PEERDISCONENCT: "peer_disconnected",
  PEER_MATCHED: "peer_matched",
  INCOMING_CALL_REQUEST: "incoming_peer_request",
  PEER_STATUS: "peer_status",
  LOOK_FOR_PEER: "look_for_peer",
};

export class PeerData {
  constructor(id, mode = "video", name) {
    this.peerId = id;
    this.mode = mode;
    this.name = name;
  }
}
// { message: message, id: meRef.current._id };
export class Message {
  // type = "message" / "media" / "status"
  constructor(message, id, type = "message", name) {
    this.message = message;
    this.id = id;
    this.type = type;
    this.name = name;
  }
}
