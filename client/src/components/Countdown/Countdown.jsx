import React, { useState, useEffect, useRef } from "react";

const Countdown = (props) => {
  const [textDay, setTextDay] = useState("––");
  const [textHour, setTextHour] = useState("––");
  const [textMinute, setTextMinute] = useState("––");
  const [textSecond, setTextSecond] = useState("––");

  const countdownDate = new Date(
    props.releaseDate.replace(/ /g, "T")
  ).getTime();

  let interval = useRef();

  const count = () => {
    const now = new Date().getTime(); // Get the current time in ms
    let gap = countdownDate - now; // Calculate gap in ms

    // Rules on how time is divided
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Countdown calculation
    if (gap <= 0) {
      // stop the timer, render cool stuff
      props.setReleased(true);
      clearInterval(interval.current);
    } else {
      let d = Math.floor(gap / day);
      let h = Math.floor((gap % day) / hour);
      let m = Math.floor((gap % hour) / minute);
      let s = Math.floor((gap % minute) / second);

      setTextDay(d < 10 ? "0" + d : "" + d);
      setTextHour(h < 10 ? "0" + h : "" + h);
      setTextMinute(m < 10 ? "0" + m : "" + m);
      setTextSecond(s < 10 ? "0" + s : "" + s);
    }
  };

  const startCountdown = () => {
    interval = setInterval(() => count(), 1000);
  };

  useEffect(() => {
    count()
    startCountdown();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div>
      {props.released || (
        <div className=" text-1 text-center py-4 border-b-2">
          <div className="font-bold mb-4">Biljetterna släpps om:</div>
          <div className="">
            <div className="flex justify-around">
              <div className="text-center w-1/4 border-r">
                <div className="font-bold text-xl mb-1">{textDay}</div>
                <div className="text-sm">Days</div>
              </div>

              <div className="text-center w-1/4 border-r">
                <div className="font-bold text-xl mb-1">{textHour}</div>
                <div className="text-sm">Hours</div>
              </div>

              <div className="text-center w-1/4 border-r">
                <div className="font-bold text-xl mb-1">{textMinute}</div>
                <div className="text-sm">Minutes</div>
              </div>

              <div className="text-center w-1/4">
                <div className="font-bold text-xl mb-1">{textSecond}</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>
          </div>
          <div className="mt-3 font-bold text-[14px]">
            Släppdatum:
            <span className="font-normal ml-1.5">{props.releaseDate}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Countdown;
