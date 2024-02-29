import { useContext } from "react";
import classes from "./css/DateList.module.css";
import { useDiariesContext } from "../hooks/useDairyContext";
import DiaryContext from "../context/DiaryContext";
import { getDiaryDate, getDiaryMonth } from "../util/getDayMonth";

const DateList = () => {
  const { diaries } = useDiariesContext();
  const {
    getIdfromClickedElementInDateList,
    handleClick,
    clickForDiaryOnOff,
    clickForAccSettingOnOff,
  } = useContext(DiaryContext);

  //Handler function
  const clickHandler = (e) => {
    handleClick(false);
    getIdfromClickedElementInDateList(e.target.id);
    clickForDiaryOnOff(true);
    clickForAccSettingOnOff(false);
  };

  //prepared data for DateItem
  const dateArray =
    diaries &&
    diaries.map((diary) => {
      const id = diary._id;
      const date = getDiaryDate(diary.createdAt);
      const month = getDiaryMonth(diary.createdAt, "short");
      return { id, date, month };
    });

  return (
    <div className={classes.dateContainer}>
      <ul className={classes.dateBox}>
        {dateArray &&
          dateArray.map((array) => (
            <div
              className={classes.date}
              onClick={clickHandler}
              id={array.id}
              key={array.id}
            >
              <span id={array.id} className={classes.dateNo}>
                {array.date}
              </span>
              <span id={array.id} className={classes.month}>
                {array.month}
              </span>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default DateList;
