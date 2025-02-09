import { start } from "../rootes.js";

export async function signin() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  if (!username || !password) {
    console.log("error");
    return;
  }

  let credentials = btoa(username + ":" + password);
  try {
    let response = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    localStorage.setItem("jwt", data);
    start()
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
