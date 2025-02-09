import { LoginPage } from "./login/template.js";
import { signin } from "./login/auth.js";
import { home } from "./graphql/template.js";
import { getUserInfo } from "./graphql/transactions.js";
import { UserInfo } from "./graphql/userInfo.js";
import {
  JSRatio,
  GoRatio,
  ModuleRatio,
  ratio,
  CheckPointRatio,
} from "./graphql/failPassRatio.js";
export const start = async () => {
  let jwt = localStorage.getItem("jwt");
  if (!jwt) {
    // let app = document.querySelector("#app");
    // app.innerHTML = LoginPage;
    // document.getElementById("btnLogin").onclick = signin;
  } else {
    //   app.innerHTML = home;
    let tables = await getUserInfo();

    UserInfo();
    //////
    await JSRatio();
    await GoRatio();
    await ModuleRatio();
    await CheckPointRatio();
    console.log(ratio);
    
  }
};

window.onload = start;
