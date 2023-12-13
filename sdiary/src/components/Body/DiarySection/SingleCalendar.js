import EmptyCalendar from "../../UI/EmptyCalendar";
import classes from "./css/SingleCalendar.module.css";

const SingleCalendar = (props) => {
  return (
    <div className={classes.singleCalendar}>
      <EmptyCalendar className={classes.emptyCalendar} />
      <p className={classes.date}>{props.date}</p>
    </div>
  );
};
export default SingleCalendar;
