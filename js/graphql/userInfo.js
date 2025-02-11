import { userInfoQ, startAtQ } from "./querys.js";
import { recieveData } from "./fetch.js";

export async function UserInfo() {
  let Info = await recieveData(userInfoQ);
  let start = await recieveData(startAtQ);
  let data = Info.data.user;
  start =  formatDate(start.data.user[0].sessions[0].started_at);
  let firstName = data[0].attrs.firstName;
  let lastName = data[0].attrs.lastName;
  let userName = firstName[0] + lastName;
  let city = data[0].attrs.city;
  let campus = data[0].campus;
  let div = document.getElementById("userInfo");
  div.innerHTML = `<span id="userName">${userName}</span>
        <div id="name">
            <span id="name">${firstName} , ${lastName}</span>
            <span id="time">${start}</span>
        </div>
        <div id="location">
            <span>${city}</span>
            <span>${campus}</span>
        </div>
         <div id="logout"></div>`;
}
function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid Date"; // Handle invalid input

  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits
  const year = date.getFullYear();

  return `${month}, ${year}`;
}
