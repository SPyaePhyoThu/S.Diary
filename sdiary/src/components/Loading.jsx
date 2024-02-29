import React from "react";
import classes from "./css/Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loader}>
        <div className={classes.loaderDot}></div>
        <div className={classes.loaderDot}></div>
        <div className={classes.loaderDot}></div>
        <div className={classes.loaderDot}></div>
        <div className={classes.loaderDot}></div>
        <div className={classes.loaderDot}></div>
        <div className={classes.loaderDot}></div>
        <div className={classes.loaderText}></div>
      </div>
    </div>
  );
};
export default Loading;
