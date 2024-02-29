const monthsLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getDiaryMonth = (day, type) => {
  return type === "long"
    ? monthsLong[new Date(day).getMonth()]
    : monthsShort[new Date(day).getMonth()];
};
export const getMonthInNo = (day) => {
  return new Date(day).getMonth();
};
export const getDiaryYear = (day) => {
  return new Date(day).getFullYear();
};

export const getDiaryDay = (day) => {
  return new Date(day).toLocaleDateString("en-US", {
    weekday: "long",
  });
};
export const getDiaryDate = (day) => {
  return new Date(day).getDate().toString().padStart(2, "0");
};
export const getDiaryCreatedAt = (day) => {
  return ` ${new Date(day).getHours().toString().padStart(2, "0")}:${new Date(
    day
  )
    .getMinutes()
    .toString()
    .padStart(2, "0")} `;
};
export const getDiaryUpatedAt = (day) => {
  return ` ${new Date(day).getHours().toString().padStart(2, "0")}:${new Date(
    day
  )
    .getMinutes()
    .toString()
    .padStart(2, "0")} (${new Date(day).toLocaleDateString("en-GB", {
    day: "2-digit",
    year: "numeric",
    month: "long",
  })}) `;
};
