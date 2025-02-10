import { formatBytes } from "./helpers.js";
export function moduleInfo(up, down, rank, xp, level) {
  let ratio = Math.round((up / down) * 10) / 10;
  xp = formatBytes(xp);
  console.log(xp, rank, ratio);
  let container = document.getElementById("moduleInfo");
  container.innerHTML = `
    <table class="stats-table">
    <tr>
        <th>Rank</th>
        <th>Level</th>
        <th>XP</th>
        <th>Audit Ratio</th>
    </tr>
    <tr>
        <td>${rank.split(" ")[0]} ${rank.split(" ")[1]}</td>
        <td>${level}</td>
        <td>${xp}</td>
        <td>${ratio}</td>
    </tr>
  
</table>
  `;
}
