const SESSION_KEY = "careerhub.session";

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getStudentId() {
  return getSession()?.studentId ?? null;
}

export function isAdmin() {
  return getSession()?.role === "ADMIN";
}

export function isStudent() {
  const role = getSession()?.role;
  return role === "STUDENT" || role === "USER";
}
