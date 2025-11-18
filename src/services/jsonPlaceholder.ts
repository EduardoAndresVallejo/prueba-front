import type { PostFormData } from "../schema/postShema";

const BASE = "https://jsonplaceholder.typicode.com";

export async function createPost(data: PostFormData) {
  const res = await fetch(`${BASE}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }
  return res.json();
}
