import React, { useEffect, useState } from "react";
import classes from "./css/calendar.module.css";
import { getDiaryMonth, getDiaryYear, getMonthInNo } from "../util/getDayMonth";
import FBReactions from "./Fbreactions";
import { useAuthContext } from "../hooks/useAuthcontext";
import { useDateContext } from "../hooks/useDateContext";

const NewCalendar = () => {
  const { user } = useAuthContext();
  const { dispatch, dates } = useDateContext();
  const today = new Date();
  const currentMonth = getDiaryMonth(today, "long");
  const currentMonthInNo = getMonthInNo(today);
  const currentYear = getDiaryYear(today);
  const [datesArray, setDatesArray] = useState(dates);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch(
          "https://s-diary-backend.vercel.app/api/v1/user/me",
          // "https://sdiary-backend.onrender.com/api/v1/user/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        const updatedDateArray = json && json.data.doc.dates;
        setDatesArray(updatedDateArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDates();
  }, [user.token]);

  /// update new calender dates at the start of the month.
  // const getDatesForCalendar = () => {
  //   let dayone = new Date(currentYear, currentMonthInNo, 1).getDay();
  //   let lastdate = new Date(currentYear, currentMonthInNo + 1, 0).getDate();
  //   let dayend = new Date(currentYear, currentMonthInNo, lastdate).getDay();
  //   let monthlastdate = new Date(currentYear, currentMonthInNo, 0).getDate();
  //   let newDates = [];
  //   for (let i = dayone; i > 0; i--) {
  //     newDates.push(monthlastdate - i + 1);
  //   }
  //   for (let i = 1; i <= lastdate; i++) {
  //     newDates.push(i);
  //   }
  //   for (let i = dayend; i < 6; i++) {
  //     newDates.push(i - dayend + 1);
  //   }
  //   return newDates;
  // };

  // const newDatesGenerator = async (dates) => {
  //   try {
  //     const res = await fetch(
  //       "https://s-diary-backend.vercel.app/api/v1/user/updateDatesArray",
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //         body: JSON.stringify({ dates: dates }),
  //       }
  //     );
  //     const json = await res.json();

  //     if (!res.ok) {
  //       return;
  //     }

  //     if (res.ok) {
  //       dispatch({ type: "UPDATE_DATES", payload: json.data.user.dates });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // console.log(currentMonthInNo, user.data.user.dates[0].currentMonthInNo);

  // if (
  //   user.data &&
  //   user.data.user &&
  //   user.data.user.dates &&
  //   user.data.user.dates.length > 0 &&
  //   user.data.user.dates[0].currentMonthInNo !== currentMonthInNo
  // ) {
  //   const newDatesArray = getDatesForCalendar().map((date) => ({
  //     date,
  //     reaction: null,
  //     currentMonthInNo: currentMonthInNo,
  //   }));

  //   newDatesGenerator(newDatesArray)
  //     .then(() => {
  //       user.data.user.dates[0].currentMonthInNo = currentMonthInNo;
  //       console.log("New dates updated for the new month.");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating new dates:", error);
  //     });
  // }

  return (
    <div className={classes.calendarContainer}>
      <header className={classes.header}>
        <h6 className={classes.heading}>React For Today!</h6>
        <p className={classes.currentMonthandYear}>
          {currentMonth}, {currentYear}
        </p>
      </header>
      <div className={classes.calendarBody}>
        <ul className={classes.datesContainer}>
          {datesArray.map((dates, index) => (
            <li key={index} className={classes.dates}>
              {dates.date}
              <FBReactions
                reaction={dates.reaction}
                datesArray={datesArray}
                index={index}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewCalendar;
