export function getCurrentHourMinute() {
  const date = new Date();
  let formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  formattedTime = formattedTime.replace(":", "h");

  return formattedTime;
}
