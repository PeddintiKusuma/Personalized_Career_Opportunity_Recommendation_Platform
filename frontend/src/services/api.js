const BASE_URL = "http://localhost:8080/api";

async function parseResponse(res) {
  const text = await res.text();
  if (!text) {
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function errorMessage(payload, status) {
  if (payload && typeof payload === "object" && payload.message) {
    return payload.message;
  }
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }
  return `Request failed: ${status}`;
}

export async function apiGet(path) {
  const res = await fetch(BASE_URL + path);
  const data = await parseResponse(res);
  if (!res.ok) {
    throw new Error(errorMessage(data, res.status));
  }
  return data;
}

export async function apiPost(path, body, options = {}) {
  const headers = { ...(options.headers || {}) };
  const init = { method: "POST", headers };

  if (options.query) {
    const params = new URLSearchParams(options.query);
    path = `${path}?${params.toString()}`;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const res = await fetch(BASE_URL + path, init);
  const data = await parseResponse(res);
  if (!res.ok) {
    throw new Error(errorMessage(data, res.status));
  }
  return data;
}

export async function apiPut(path, body, options = {}) {
  const headers = { ...(options.headers || {}) };
  const init = { method: "PUT", headers };

  if (options.query) {
    const params = new URLSearchParams(options.query);
    path = `${path}?${params.toString()}`;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const res = await fetch(BASE_URL + path, init);
  const data = await parseResponse(res);
  if (!res.ok) {
    throw new Error(errorMessage(data, res.status));
  }
  return data;
}

export async function apiDelete(path) {
  const res = await fetch(BASE_URL + path, { method: "DELETE" });
  const data = await parseResponse(res);
  if (!res.ok) {
    throw new Error(errorMessage(data, res.status));
  }
  return data;
}

export function unwrapInternship(item) {
  if (!item) return item;
  return item.internship ? { ...item.internship, score: item.score } : item;
}

export function unwrapProject(item) {
  if (!item) return item;
  return item.project ? { ...item.project, score: item.score } : item;
}
