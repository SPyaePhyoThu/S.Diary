import { useContext, useEffect, useState } from "react";
import classes from "./css/calendar.module.css";
import Fbreactions from "./Fbreactions";
import Angry from "../../assets/angry.svg";
import Laughing from "../../assets/laughing.svg";
import Like from "../../assets/like.svg";
import Sad from "../../assets/sad.svg";
import Soaked from "../../assets/soaked.svg";
import Love from "../../assets/love.svg";
import DiaryContext from "../context/DiaryContext";
import { useAuthContext } from "../hooks/useAuthcontext";

const Calendar = () => {
  const [dates, setDates] = useState([]);
  const [currentMonthandYear, setCurrentMonthandYear] = useState("");
  const [date, setDate] = useState(new Date()); // creates a new date object with the current date and time
  const [year, setYear] = useState(date.getFullYear()); // gets the current year
  const [month, setMonth] = useState(date.getMonth()); // gets the current month (index based, 0-11)
  const [clickedDay, setClickedDay] = useState();
  const { reload } = useContext(DiaryContext);
  const { user } = useAuthContext();
  const months = [
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
  const indexOfLastDay = dates.lastIndexOf(1);
  const findLargestNumber = (arr) => {
    if (arr.length === 0) {
      return null;
    }
    let largestNumber = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > largestNumber) {
        largestNumber = arr[i];
      }
    }
    return largestNumber;
  };

  const largestNumber = findLargestNumber(dates.slice(1, 7));

  const indexOfFirstDay = dates.indexOf(largestNumber);

  const transformArray = (dates) => {
    const likeIndices = dates.reduce((a, e, i) => {
      if (e === "like") a.push(i);
      return a;
    }, []);
    likeIndices.map((index) => (dates[index] = Like));
    const loveIndices = dates.reduce((a, e, i) => {
      if (e === "love") a.push(i);
      return a;
    }, []);
    loveIndices.map((index) => (dates[index] = Love));
    const laughingIndices = dates.reduce((a, e, i) => {
      if (e === "laughing") a.push(i);
      return a;
    }, []);
    laughingIndices.map((index) => (dates[index] = Laughing));
    const sadIndices = dates.reduce((a, e, i) => {
      if (e === "sad") a.push(i);
      return a;
    }, []);
    sadIndices.map((index) => (dates[index] = Sad));
    const soakedIndices = dates.reduce((a, e, i) => {
      if (e === "soaked") a.push(i);
      return a;
    }, []);
    soakedIndices.map((index) => (dates[index] = Soaked));
    const angryIndices = dates.reduce((a, e, i) => {
      if (e === "angry") a.push(i);
      return a;
    }, []);
    angryIndices.map((index) => (dates[index] = Angry));
  };

  const getDatesForCalendar = () => {
    // get the first day of the month
    let dayone = new Date(year, month, 1).getDay();

    // get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();

    // get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    let newDates = []; // variable to store the generated calendar HTML

    // loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
      newDates.push(monthlastdate - i + 1);
    }

    // loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
      newDates.push(i);
    }

    // loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
      newDates.push(i - dayend + 1);
    }

    return newDates;
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        "https://sdiary-backend.onrender.com/api/v1/user/me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      const rawDates = json.data.doc.dates;
      transformArray(rawDates);
      setDates(json.data.doc.dates);
    };
    getUser();
    //update the text of the current date element with the formatted current month and year
    setCurrentMonthandYear(`${months[month]} ${year}`);

    const currentDate = new Date();
    if (currentDate.getDate() === 1) {
      const newDates = getDatesForCalendar();
      const currentMonth = new Date().getMonth();
      let monthNumber = localStorage.getItem("currentMonth");

      if (+monthNumber !== currentMonth) {
        monthNumber = "";
      }

      //Update dates array at start of every Month
      const updateNewDateArray = async () => {
        try {
          const response = await fetch(
            "https://sdiary-backend.onrender.com/api/v1/user/updateDatesArray",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({ dates: newDates }),
            }
          );
          const json = await response.json();
        } catch (error) {
          console.error("Error updating dates Array", error);
        }
      };

      if (!monthNumber) {
        updateNewDateArray();
        localStorage.setItem("currentMonth", currentMonth);
      }
    }
  }, [month, reload]);

  // const clickHandler = (e) => {
  //   if (e.target.id === "calendar-prev") {
  //     // Decrement the month and year if necessary
  //     if (month === 0) {
  //       setYear(year - 1);
  //       setMonth(11); // Set the month to December
  //     } else {
  //       setMonth(month - 1);
  //     }
  //     setCurrentMonth((prev) => prev - 1);
  //   } else if (e.target.id === "calendar-next") {
  //     // Increment the month and year if necessary
  //     if (month === 11) {
  //       setYear(year + 1);
  //       setMonth(0); // Set the month to January
  //     } else {
  //       setMonth(month + 1);
  //     }
  //     setCurrentMonth((prev) => prev + 1);
  //   }
  //   // Update the text of the current date element with the formatted current month and year
  //   setCurrentMonthandYear(`${months[month]} ${year}`);
  // };

  return (
    <div className={classes.calendarContainer}>
      <header className={classes.header}>
        <h1 className={classes.heading}>React For Today!</h1>

        <div className={classes.calendarNavigation}>
          {/* <span
            id="calendar-prev"
            onClick={clickHandler}
            className={classes.symbol}
          >
            &#x3c;
          </span>
          <span
            id="calendar-next"
            onClick={clickHandler}
            className={classes.symbol}
          >
            &#x3e;
          </span> */}
          <p className={classes.currentMonthandYear}>{currentMonthandYear}</p>
        </div>
      </header>
      <div className={classes.calendarBody}>
        <ul className={classes.datesContainer}>
          {dates.map((date, index) => (
            <Fbreactions
              firstDay={indexOfFirstDay}
              lastDay={indexOfLastDay}
              index={index}
              dates={dates}
              date={date}
              key={index}
              day={clickedDay}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Calendar;
