import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialSeconds, task, onComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Cleanup function to clear the interval when the component unmounts or when the countdown reaches zero
      return () => clearInterval(intervalId);
    } else {
      onComplete(); // Trigger the callback when the countdown reaches zero
    }
  }, [seconds, onComplete]);

  const handleClick = () => {
    // Start the countdown when the button is clicked
    // console.log(`Doing this task in ${initialSeconds} seconds...`);

    // You can perform additional actions related to the task here if needed

    setSeconds(initialSeconds); // Reset the countdown
  };

  return (
    <div>
      <h2>Countdown Timer</h2>
      <button onClick={handleClick}>Start Task</button>
      {seconds > 0 && <p>Doing this task in {seconds} seconds...</p>}
    </div>
  );
};

export default CountdownTimer;
