import DiaryEntryForm from "./DiaryEntryForm";
import classes from "./css/DiarySection.module.css";
import Diary from "./Diary";
import DiaryContext from "../context/DiaryContext";
import { useContext } from "react";

const DiarySection = () => {
  const { create } = useContext(DiaryContext);

  return (
    <div className={classes.diarySection}>
      {create ? <DiaryEntryForm /> : <Diary />}
    </div>
  );
};
export default DiarySection;
