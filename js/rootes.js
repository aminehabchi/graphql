import { LoginPage } from "./auth/template.js";
import { signin } from "./auth/login.js";
import { getTransaction } from "./graphql/transactions.js";
import { UserInfo } from "./graphql/userInfo.js";
import { logout } from "./auth/logout.js";
import {
  JSRatio,
  GoRatio,
  ModuleRatio,
  CheckPointRatio,
} from "./graphql/failPassRatio.js";
import {
  pieSection,
  passFailSection,
  lineSection,
  userInfoSection,
} from "./graphs.js/template.js";
export const start = async () => {
  let app = document.querySelector("#app");
  if (!app) {
    return;
  }
  let jwt = localStorage.getItem("jwt");
  if (!jwt) {
    app.innerHTML = LoginPage;
    document.getElementById("btnLogin").onclick = signin;
    document.getElementById("password").addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        signin();
      }
    });
  } else {
    app.innerHTML =
      userInfoSection + passFailSection + lineSection + pieSection;
    await getTransaction();

    UserInfo();

    await JSRatio();
    await GoRatio();
    await ModuleRatio();
    await CheckPointRatio();

    document.getElementById("logout").onclick = logout;
  }
};

window.onload = start;
