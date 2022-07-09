import jwtDecode from "jwt-decode";
export function getRole() {
  const token = localStorage.getItem("token");
  if (token !== null) {
    const decoded = jwtDecode(token);
    return decoded.role;
  } else {
    return { role: "" };
  }
}

export function getGuid() {
  const token = localStorage.getItem("token");
  if (token !== null) {
    const decoded = jwtDecode(token);
    return decoded.guid;
  } else {
    return { guid: "" };
  }
}
export function getGRole() {
  const token = localStorage.getItem("token");
  if (token !== null) {
    const decoded = jwtDecode(token);
    return decoded.role;
  } else {
    return { role: "" };
  }
}