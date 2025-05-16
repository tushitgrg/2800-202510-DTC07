"use client";
import { ServerUrl } from "./urls";

export async function getUserClient() {
  try {
    const res = await fetch(`${ServerUrl}/`, {
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data._id) {
      return data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
