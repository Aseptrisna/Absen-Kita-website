export function authHeader() {
  const token = localStorage.getItem("token");
  if (token !== null) {
    return { 'x-access-token': token }
  } else {
    return {}
  }
}