import { useContext, useEffect } from "react";
import classes from "./css/DateList.module.css";
import { useDiariesContext } from "../../hooks/useDairyContext";
import DiaryContext from "../../context/DiaryContext";
import { useAuthContext } from "../../hooks/useAuthcontext";

const DateList = () => {
  const { diaries, dispatch } = useDiariesContext();
  const {
    getIdfromClickedElementInDateList,
    handleClick,
    reload,
    clickForDiaryOnOff,
    clickForAccSettingOnOff,
  } = useContext(DiaryContext);
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
  const currentMonth = months[new Date().getMonth()];

  //fetching all diary for date list
  useEffect(() => {
    try {
      const fetchDiary = async () => {
        const res = await fetch(
          "https://sdiary-backend.onrender.com/api/v1/diary",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await res.json();

        if (res.ok) {
          dispatch({ type: "SET_DIARIES", payload: json.data.data });
        }
      };
      if (user) {
        fetchDiary();
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, reload, user]);

  //Handler function
  const clickHandler = (e) => {
    handleClick(false);
    getIdfromClickedElementInDateList(e.target.id);
    clickForDiaryOnOff(true);
    clickForAccSettingOnOff(false);
  };

  return (
    <div className={classes.dateContainer}>
      <div className={classes.month}>{currentMonth}</div>
      <ul className={classes.dateBox}>
        {diaries &&
          diaries.map((diary) => {
            const date = new Date(diary.createdAt).getDate();
            const prevMonth = months[new Date(diary.createdAt).getMonth() - 1];
            return (
              <div key={diary._id}>
                <li
                  onClick={clickHandler}
                  id={diary._id}
                  className={classes.date}
                >
                  {date}
                </li>
                {date === 1 && <div className={classes.month}>{prevMonth}</div>}
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default DateList;
