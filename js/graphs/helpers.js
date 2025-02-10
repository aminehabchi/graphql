export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1000;
  if (bytes < k) return bytes + " Bytes";
  if (bytes < k * k) return Math.round(bytes / k) + " KB";
  return (bytes / (k * k)).toFixed(2) + "MB";
}
export function getday(time) {
  return Math.floor(time / (1000 * 60 * 60 * 24));
}
export function formatDate(date) {
  let day = date.getDate().toString().padStart(2, "0");
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthNames[date.getMonth()];
  return `${day}, ${month}`;
}
