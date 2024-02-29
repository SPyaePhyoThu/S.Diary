import React, { useState, useEffect } from "react";
import classes from "./css/Quote.module.css";

const Quote = () => {
  const quotes = [
    "Live A Life Worth Writing About.",
    "Keep a diary, and someday it'll keep you.",
    "Record your most enviable experiences in a diary.",
    "A diary allows you to read your life as an adventure story.",
  ];

  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 5000);

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, []);

  return <div className={classes.quote}>{quote}</div>;
};
export default Quote;
