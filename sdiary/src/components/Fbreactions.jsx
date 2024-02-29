import React, { useState, useContext } from "react";
import Angry from "../assets/angry.svg";
import Laughing from "../assets/laughing.svg";
import Like from "../assets/like.svg";
import Sad from "../assets/sad.svg";
import Soaked from "../assets/soaked.svg";
import Love from "../assets/love.svg";
import { motion } from "framer-motion";
import classes from "./css/Fbreaction.module.css";
// import DiaryContext from "../context/DiaryContext";
import { useAuthContext } from "../hooks/useAuthcontext";
import { useDateContext } from "../hooks/useDateContext";

const FBReactions = (props) => {
  const datesArray = props.datesArray;
  const [btnClicked, setBtnClicked] = useState(false);
  const [reaction, setReaction] = useState(props.reaction);
  const [id, setId] = useState();
  // const { reloadHandler } = useContext(DiaryContext);
  const { user } = useAuthContext();
  const [error, setError] = useState();
  const { dispatch } = useDateContext();

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "beforeChildren",
      },
      scale: 0.6,
    },
  };

  const exportReactions = async (reactionString) => {
    if (user.data.user.role === "not user") {
      setError("E");
      return;
    }
    setReaction(reactionString);
    try {
      datesArray[id].reaction = reactionString;
      const res = await fetch(
        "https://s-diary-backend.vercel.app/api/v1/user/updateDatesArray",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ dates: datesArray }),
        }
      );
      const json = await res.json();

      if (!res.ok) {
        setError(json.message);
      }

      if (res.ok) {
        dispatch({ type: "UPDATE_DATES", payload: json.data.user.dates });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      key={reaction}
      className={classes.container}
      onClick={() => btnClicked === true && setBtnClicked(false)}
    >
      <motion.div
        className={classes.reactionBox}
        variants={list}
        animate={btnClicked ? "visible" : "hidden"}
      >
        <motion.img
          whileHover={{ scale: 1.5 }}
          src={Like}
          key={Like}
          alt="Like"
          onClick={() => {
            exportReactions("like");
          }}
          className={classes.reactions}
        />
        <motion.img
          whileHover={{ scale: 1.5 }}
          src={Love}
          key={Love}
          alt="Love"
          onClick={() => {
            exportReactions("love");
          }}
          className={classes.reactions}
        />
        <motion.img
          whileHover={{ scale: 1.5 }}
          src={Angry}
          key={Angry}
          alt="Angry"
          onClick={() => {
            exportReactions("angry");
          }}
          className={classes.reactions}
        />
        <motion.img
          whileHover={{ scale: 1.5 }}
          src={Sad}
          key={Sad}
          alt="Sad"
          onClick={() => {
            exportReactions("sad");
          }}
          className={classes.reactions}
        />
        <motion.img
          whileHover={{ scale: 1.5 }}
          src={Soaked}
          key={Soaked}
          alt="Soaked"
          onClick={() => {
            exportReactions("soaked");
          }}
          className={classes.reactions}
        />
        <motion.img
          whileHover={{ scale: 1.5 }}
          src={Laughing}
          key={Laughing}
          alt="Laughing"
          onClick={() => {
            exportReactions("laughing");
          }}
          className={classes.reactions}
        />
      </motion.div>
      <motion.button
        key={reaction}
        className={classes.btn}
        onClick={() => {
          setBtnClicked(true);
          setId(props.index);
        }}
        // disabled={
        //   props.index >= props.lastDay || props.index <= props.firstDay
        //     ? true
        //     : false
        // }
      >
        {error ? (
          <span className={classes.error}>{error}</span>
        ) : (
          (() => {
            switch (reaction) {
              case "like":
                return (
                  <img
                    src={Like}
                    className={classes.reactionsSelected}
                    alt="like"
                  />
                );
              case "love":
                return (
                  <img
                    src={Love}
                    className={classes.reactionsSelected}
                    alt="love"
                  />
                );
              case "angry":
                return (
                  <img
                    src={Angry}
                    className={classes.reactionsSelected}
                    alt="angry"
                  />
                );
              case "sad":
                return (
                  <img
                    src={Sad}
                    className={classes.reactionsSelected}
                    alt="sad"
                  />
                );
              case "soaked":
                return (
                  <img
                    src={Soaked}
                    className={classes.reactionsSelected}
                    alt="soaked"
                  />
                );
              case "laughing":
                return (
                  <img
                    src={Laughing}
                    className={classes.reactionsSelected}
                    alt="laughing"
                  />
                );

              default:
                return <span className={classes.plusSign}>+</span>;
            }
          })()
        )}
      </motion.button>
    </motion.div>
  );
};

export default FBReactions;
