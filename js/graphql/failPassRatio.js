import {
  moduleFall,
  modulePass,
  piscineGoFall,
  piscineGoPass,
  piscineJsFall,
  piscineJsPass,
  checkpointFail,
  checkpointPass,
} from "./querys.js";
import { recieveData } from "./fetch.js";
import { CreateCircle } from "../graphs/circle.js";
export let ratio = {
  module: 0,
  Go: 0,
  Js: 0,
  chp: 0,
};

export async function GoRatio() {
  let Pass = await recieveData(piscineGoPass);
  let Fall = await recieveData(piscineGoFall);
  Pass = Pass.data.progress_aggregate.aggregate.count;
  Fall = Fall.data.progress_aggregate.aggregate.count;
  ratio.Go = (Pass * 100) / (Pass + Fall);
  CreateCircle(ratio.Go, "Piscine-Go");
}
export async function JSRatio() {
  let Pass = await recieveData(piscineJsPass);
  let Fall = await recieveData(piscineJsFall);
  Pass = Pass.data.progress_aggregate.aggregate.count;
  Fall = Fall.data.progress_aggregate.aggregate.count;
  ratio.Js = (Pass * 100) / (Pass + Fall);
  CreateCircle(ratio.Js, "Piscine-Js");
}
export async function ModuleRatio() {
  let Pass = await recieveData(modulePass);
  let Fall = await recieveData(moduleFall);
  Pass = Pass.data.progress_aggregate.aggregate.count;
  Fall = Fall.data.progress_aggregate.aggregate.count;

  ratio.module = (Pass * 100) / (Pass + Fall);
  CreateCircle(ratio.module, "Module");
}
export async function CheckPointRatio() {
  let Pass = await recieveData(checkpointPass);
  let Fall = await recieveData(checkpointFail);
  Pass = Pass.data.progress_aggregate.aggregate.count;
  Fall = Fall.data.progress_aggregate.aggregate.count;

  ratio.chp = (Pass * 100) / (Pass + Fall);

  CreateCircle(ratio.chp, "CheckPoint");
}
