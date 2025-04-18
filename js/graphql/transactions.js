import { createLineGraphs } from "../graphs/line.js";
import { createPieChart } from "../graphs/pie.js";
import { recieveData } from "./fetch.js";
import { transactionQ } from "./querys.js";
import { rank } from "../graphs/template.js";
import { moduleInfo } from "../graphs/moduleInfo.js";
export let transaction = {
  module: 0,
  piscineGo: 0,
  piscineJs: 0,
  moduleLevel: 0,
  jsLevel: 0,
  goLevel: 0,
  up: 0,
  down: 0,
  xpTimeM: [],
  rank: "",
  xpTimeJs: [],
  xpTimeGo: [],
  skills: {},
};
export async function getTransaction() {
  transaction = {
    module: 0,
    piscineGo: 0,
    piscineJs: 0,
    moduleLevel: 0,
    jsLevel: 0,
    goLevel: 0,
    up: 0,
    down: 0,
    xpTimeM: [],
    rank: "",
    xpTimeJs: [],
    xpTimeGo: [],
    skills: {},
  };
  let data = await recieveData(transactionQ);
  if (!data) {
    return;
  }
  count(data);
  rank.forEach((element) => {
    if (element.level > transaction.moduleLevel) {
      return;
    }
    transaction.rank = element.name;
  });
  moduleInfo(
    transaction.up,
    transaction.down,
    transaction.rank,
    transaction.module,
    transaction.moduleLevel
  );
}

function count(data) {
  transaction.skills = new Map();
  transaction.xpTimeM = new Array();
  data.data.transaction.forEach((element) => {
    assign(element);
  });

  document.getElementById("type").addEventListener("change", (event) => {
    switch (event.target.value) {
      case "Js":
        createLineGraphs(
          transaction.xpTimeJs,
          transaction.piscineJs,
          transaction.jsLevel
        );
        break;
      case "Go":
        createLineGraphs(
          transaction.xpTimeGo,
          transaction.piscineGo,
          transaction.goLevel
        );
        break;
      case "Module":
        createLineGraphs(
          transaction.xpTimeM,
          transaction.module,
          transaction.moduleLevel
        );
        break;
    }
  });
  createLineGraphs(
    transaction.xpTimeM,
    transaction.module,
    transaction.moduleLevel
  );

  createPieChart(transaction.skills);
}

function assign(element) {
  switch (element.type) {
    case "xp":
      let projectName = element.path.split("/").pop();

      if (element.path === "/oujda/module/piscine-js") {
        transaction.xpTimeM.push([
          projectName,
          element.amount,
          new Date(element.createdAt),
        ]);
        transaction.module += Number(element.amount);
      } else if (element.path.startsWith("/oujda/module/piscine-js/")) {
        transaction.xpTimeJs.push([
          projectName,
          element.amount,
          new Date(element.createdAt),
        ]);
        transaction.piscineJs += Number(element.amount);
      } else if (element.path.startsWith("/oujda/piscine-go")) {
        transaction.piscineGo += Number(element.amount);
        transaction.xpTimeGo.push([
          projectName,
          element.amount,
          new Date(element.createdAt),
        ]);
      } else {
        transaction.xpTimeM.push([
          projectName,
          element.amount,
          new Date(element.createdAt),
        ]);
        transaction.module += Number(element.amount);
      }
      break;
    case "up":
      transaction.up += element.amount;
      break;
    case "down":
      transaction.down += element.amount;
      break;
    case "level":
      if (element.path == "/oujda/module/piscine-js") {
        transaction.moduleLevel = Compare(
          transaction.moduleLevel,
          element.amount
        );
      } else if (element.path.startsWith("/oujda/module/piscine-js")) {
        transaction.jsLevel = Compare(transaction.jsLevel, element.amount);
      } else if (element.path.startsWith("/oujda/piscine-go")) {
        transaction.goLevel = Compare(transaction.goLevel, element.amount);
      } else if (element.path.startsWith("/oujda/module/")) {
        transaction.moduleLevel = Compare(
          transaction.moduleLevel,
          element.amount
        );
      }
      break;
    default:
      if (transaction.skills.has(element.type)) {
        transaction.skills.set(
          element.type,
          Compare(transaction.skills.get(element.type), element.amount)
        );
      } else {
        transaction.skills.set(element.type, element.amount);
      }
  }
}

function Compare(a, b) {
  if (Number(a) > Number(b)) {
    return a;
  }
  return b;
}
