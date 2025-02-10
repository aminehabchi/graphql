import { start } from "../rootes.js";

export async function signin() {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  if (!username || !password) {
    console.log("error");
    return;
  }

  if (!username.value || !password.value) {
    username.style.border = `2px solid red`;
    password.style.border = `2px solid red`;
    return;
  }
  username = username.value;
  password = password.value;
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
      return;
    }

    let data = await response.json();
    localStorage.setItem("jwt", data);
    start();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
