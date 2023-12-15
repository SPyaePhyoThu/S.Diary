import React, { useState, useContext } from "react";
import Angry from "../../assets/angry.svg";
import Laughing from "../../assets/laughing.svg";
import Like from "../../assets/like.svg";
import Sad from "../../assets/sad.svg";
import Soaked from "../../assets/soaked.svg";
import Love from "../../assets/love.svg";
import { motion } from "framer-motion";
import classes from "./css/Fbreaction.module.css";
import DiaryContext from "../context/DiaryContext";
import { useAuthContext } from "../hooks/useAuthcontext";

const FBReactions = (props) => {
  const Reaction = props.reaction ? props.reaction : "";
  const [btnClicked, setBtnClicked] = useState(false);
  const [reaction, setReaction] = useState(Reaction);
  const [id, setId] = useState();
  const { reloadHandler } = useContext(DiaryContext);
  const { user } = useAuthContext();

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

  const exportReactions = async (reaction) => {
    if (user.data.user.role === "not user") return;
    try {
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
      const updatedDateArray = json && json.data.doc.dates;

      updatedDateArray[id] = reaction;
      const res = await fetch(
        "https://sdiary-backend.onrender.com/api/v1/user/updateDatesArray",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ dates: updatedDateArray }),
        }
      );

      if (res.ok) {
        reloadHandler();
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
            setReaction(Like);
          }}
          className={classes.reactions}
        />
        <motion.img
          whileHover={{ scale: 1.5 }}
          src={Love}
          key={Love}
          alt="Love"
          onClick={() => {
            setReaction(Love);
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
            setReaction(Angry);
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
            setReaction(Sad);
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
            setReaction(Soaked);
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
            setReaction(Laughing);
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
        disabled={
          props.index >= props.lastDay || props.index <= props.firstDay
            ? true
            : false
        }
      >
        {/* {reaction === "" ? (
          <motion.li className={classes.datesBtn}>
            {typeof props.date === "number" ? (
              props.date
            ) : (
              <img src={props.date} className={classes.reactions} />
            )}
          </motion.li>
        ) : (
          <img src={reaction} alt="" />
        )} */}

        <motion.li
          className={typeof props.date === "number" ? classes.datesBtn : ""}
        >
          {typeof props.date === "number" ? (
            props.date
          ) : (
            <img
              src={props.date}
              className={classes.reaction}
              alt={props.date}
            />
          )}
        </motion.li>
      </motion.button>
    </motion.div>
  );
};

export default FBReactions;
