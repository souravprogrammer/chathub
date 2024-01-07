"use client";

export function getPeerIdfromSession() {
  const id = sessionStorage.getItem("myid");
  return !!id ? id : null;
}
export function setPeerIdfromSession(id) {
  return sessionStorage.setItem("myid", id);
}
