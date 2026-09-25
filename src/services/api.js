const BASE_URL = "http://localhost:8080/api";

export async function apiGet(path) {
  const res = await fetch(BASE_URL + path);

  if (!res.ok) {
    throw new Error("API GET failed: " + res.status);
  }

  return res.json(); // 🔥 must be JSON
}

export async function apiPost(path, body) {
  const res = await fetch(BASE_URL + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("API POST failed: " + res.status);
  }

  return res.json();
}
export const apiDelete = async (path) => {
  const res = await fetch(BASE_URL + path, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`DELETE failed: ${res.status}`);
  }

  return res.text(); // ✅ IMPORTANT
};

export const getRejectedApplications = () =>
  apiGet("/api/applications/rejected");

export const rejectApplication = (id) =>
  apiPost(`/api/applications/reject/${id}`);
