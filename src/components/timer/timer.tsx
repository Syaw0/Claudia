import formatSecond from "../../utils/formatSecond";
import { useEffect, useState } from "react";
import Text from "../typography/typography";
import style from "./timer.module.css";

interface timerPropsType {
  time: number;
  setTime: any;
}

const Timer = ({ setTime, time }: timerPropsType) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((s: number) => s - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [setTime]);
  return (
    <>
      {time > 0 && (
        <Text testid="timer" className={style.timer} as="span">
          after {formatSecond(time)}
        </Text>
      )}
    </>
  );
};

export default Timer;
