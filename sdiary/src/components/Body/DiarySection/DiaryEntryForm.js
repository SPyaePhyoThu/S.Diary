import React, { useEffect } from "react";
import DiaryContext from "../../context/DiaryContext";
import classes from "./css/DiaryEntryForm.module.css";
import { useDiariesContext } from "../../hooks/useDairyContext";
import { useContext, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthcontext";

const DiaryEntryForm = () => {
  const curDay = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    year: "numeric",
    month: "long",
  });
  const { diaries, dispatch } = useDiariesContext();
  const {
    handleClick,
    selectedDiary,
    edit,
    reloadHandler,
    reload,
    clickForDiaryOnOff,
    getIdfromClickedElementInDateList,
  } = useContext(DiaryContext);
  const [currentDay, setCurrentDay] = useState(curDay);
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [details, setDetails] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const firstName = user.data.user.name.split(" ")[0];
  const index =
    diaries && diaries.findIndex((diary) => diary._id === selectedDiary._id);

  useEffect(() => {
    if (edit) {
      setSelectedDomains(selectedDiary.about);

      setSelectedFeelings(selectedDiary.feeling);

      setDetails(selectedDiary.details);
      setCurrentDay(
        new Date(selectedDiary.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          year: "numeric",
          month: "long",
        })
      );
    } else return;
  }, [
    setSelectedDomains,
    setDetails,
    setSelectedFeelings,
    reload,
    selectedDiary,
    edit,
  ]);

  // setDiaryDay(currentDay);
  const feelings = [
    "Happy",
    "Satisfied",
    "Confident",
    "Angry",
    "Regret",
    "Tired",
    "Confused",
    "Sad",
    "Ok",
    "positive",
    "Unsure",
  ];
  const socialDomains = [
    "Family",
    "Myself",
    "Coworker",
    "Relationship",
    "Electricity",
    "Finance",
    "Siblilngs",
    "College",
    "Parents",
    "Friends",
    "School",
    "Job",
  ];

  //  Handler functions
  function handleChange(e) {
    if (e.target.checked) {
      setSelectedFeelings([...selectedFeelings, e.target.value]);
    } else {
      setSelectedFeelings(
        selectedFeelings.filter((item) => item !== e.target.value)
      );
    }
  }
  function handleChange1(e) {
    if (e.target.checked) {
      setSelectedDomains([...selectedDomains, e.target.value]);
    } else {
      setSelectedDomains(
        selectedDomains.filter((item) => item !== e.target.value)
      );
    }
  }

  const clickHandler = () => {
    handleClick(false);
    clickForDiaryOnOff();
  };

  //creating diary
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.data.user.role === "not user") {
      setError("Please log in to perform this action");
      return;
    }

    if (!user) {
      setError("You must Log In");
    }

    const diaries = {
      feeling: selectedFeelings,
      about: selectedDomains,
      details,
    };
    try {
      const response = await fetch(
        "https://sdiary-backend.onrender.com/api/v1/diary",
        {
          method: "POST",
          body: JSON.stringify(diaries),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
      }
      if (response.ok) {
        setError(null);
        setSelectedFeelings([]);
        setSelectedDomains([]);
        setDetails("");
        handleClick(false);
        dispatch({ type: "CREATE_DIARY", payload: json.data.data });
        reloadHandler();
        getIdfromClickedElementInDateList(json.data.data._id);
      }
    } catch (error) {
      setError(error);
    }
  };

  //editing the diary
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (user.data.user.role === "not user") {
      setError("Please log in to perform this action");
      return;
    }

    const diary = {
      feeling: selectedFeelings,
      about: selectedDomains,
      details,
    };

    try {
      const response = await fetch(
        `https://sdiary-backend.onrender.com/api/v1/diary/${selectedDiary._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(diary),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        setError(json.message);
      }
      if (response.ok) {
        const updatedDiary = {
          ...json.data.data,
          feeling: selectedFeelings,
          about: selectedDomains,
          details,
        };

        diaries[index] = updatedDiary;

        setError(null);

        setSelectedFeelings([]);
        setSelectedDomains([]);
        setDetails("");
        handleClick(false);

        dispatch({ type: "UPDATE_DIARY", payload: diaries });
        reloadHandler();
        getIdfromClickedElementInDateList(json.data._id);
      }
    } catch (error) {
      setError(error);
    }
  };

  //feelings
  const feeling = feelings.map((feel) => {
    if (
      feel.toLowerCase().trim() === "sad" ||
      feel.toLowerCase().trim() === "tired" ||
      feel.toLowerCase().trim() === "angry"
    ) {
      return (
        <label
          id={feel}
          className={
            selectedFeelings && selectedFeelings.includes(feel)
              ? classes.fourthColorSelected
              : classes.fourthColor
          }
          key={feel}
        >
          <input
            value={feel}
            type="checkbox"
            className={classes.input}
            htmlFor={feel}
            onChange={handleChange}
          />
          {feel}
        </label>
      );
    } else if (
      feel.toLowerCase().trim() === "happy" ||
      feel.toLowerCase().trim() === "satisfied" ||
      feel.toLowerCase().trim() === "ok" ||
      feel.toLowerCase().trim() === "confident"
    ) {
      return (
        <label
          id={feel}
          className={
            selectedFeelings && selectedFeelings.includes(feel)
              ? classes.secondColorSelected
              : classes.secondColor
          }
          key={feel}
        >
          <input
            value={feel}
            type="checkbox"
            className={classes.input}
            htmlFor={feel}
            onChange={handleChange}
          />
          {feel}
        </label>
      );
    } else {
      return (
        <label
          id={feel}
          className={
            selectedFeelings && selectedFeelings.includes(feel)
              ? classes.fifthColorSelected
              : classes.fifthColor
          }
          key={feel}
        >
          <input
            value={feel}
            type="checkbox"
            className={classes.input}
            htmlFor={feel}
            onChange={handleChange}
          />
          {feel}
        </label>
      );
    }
  });

  return (
    <form
      onSubmit={edit ? handleSubmitEdit : handleSubmit}
      className={classes.form}
    >
      <div className={classes.headerSection}>
        <h1 className={classes.heading}>Hi, {firstName}</h1>
        <div className={classes.currentDay}>{currentDay}</div>
      </div>

      <label className={classes.questions}>How are you feeling today?</label>
      <div className={classes.feelingInput}>{feeling}</div>

      <label className={classes.questions}> What was it about?</label>
      <div className={classes.feelingInput}>
        {socialDomains.map((domain) => (
          <label
            className={
              selectedDomains && selectedDomains.includes(domain)
                ? classes.labelSelected
                : classes.label
            }
            key={domain}
          >
            <input
              value={domain}
              type="checkbox"
              className={classes.input}
              htmlFor={domain}
              onChange={handleChange1}
            />
            {domain}
          </label>
        ))}
      </div>

      <label className={classes.questions}>How was your day?</label>
      <textarea
        value={details}
        name="details"
        id="details"
        className={classes.textarea}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>

      <div className={error ? classes.btnBox : classes.btnBoxWOError}>
        {error && <p className={classes.error}>{error}</p>}
        <button onClick={clickHandler} className={classes.btn}>
          Cancel
        </button>

        <button type="submit" className={classes.btn}>
          {edit ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};
export default DiaryEntryForm;
