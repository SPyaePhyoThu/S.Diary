import EmptyCalendar from "../ui/EmptyCalendar";
import classes from "./css/SingleCalendar.module.css";

const SingleCalendar = (props) => {
  return (
    <div className={classes.singleCalendar}>
      <p className={classes.date}>{props.date}</p>
      <EmptyCalendar className={classes.emptyCalendar} />
    </div>
  );
};
export default SingleCalendar;
