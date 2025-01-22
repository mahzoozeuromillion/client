import React, { useState, useEffect } from 'react';

const CountdownDisplay = ({ initialSeconds }) => {
  const [time, setTime] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;

    return `${days}D : ${hours.toString().padStart(2, '0')}H : ${minutes
      .toString()
      .padStart(2, '0')}M : ${secs.toString().padStart(2, '0')}S`;
  };

  return <div>{formatTime(time)}</div>;
};

export default CountdownDisplay;
