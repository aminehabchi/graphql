import { start } from "../rootes.js";
export function logout() {
  localStorage.removeItem("jwt");
  start();
}
