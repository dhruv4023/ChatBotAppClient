import React, { useEffect, useState } from "react";
import WidgetWrapper from "Components/WidgetWrapper";
import MyTitle from "./MyTitle";

const CountDown = ({ targetTimestamp }) => {
  const calculateTimeRemaining = () => {
    const currentTime = new Date().getTime();
    const timeDifference = new Date(targetTimestamp) - currentTime;

    if (timeDifference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = calculateTimeRemaining();
      setTimeRemaining(remainingTime);

      if (
        remainingTime.days === 0 &&
        remainingTime.hours === 0 &&
        remainingTime.minutes === 0 &&
        remainingTime.seconds === 0
      ) {
        clearInterval(interval); // Stop the countdown when it reaches zero
      }
    }, 1000);

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);
  return (
    <WidgetWrapper>
      <MyTitle txt={"Auction will start In"} />
      <h3>
        {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m{" "}
        {timeRemaining.seconds}s
      </h3>
    </WidgetWrapper>
  );
};

export default CountDown;
