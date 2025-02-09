import { userInfoQ } from "./querys.js";
import { recieveData } from "./fetch.js";
let Info;
export async function UserInfo() {
  Info = await recieveData(userInfoQ);
  console.log(Info);
}
