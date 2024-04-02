import React, { useState, useEffect } from "react";

export const CountdownTimer = ({
  duration = 60,
  color = "#007bff",
  radius = 50,
  strokeWidth = 10,
  textColor = "#fff",
  fontSize = 24,
  onComplete,
}) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [filledPercent, setFilledPercent] = useState(100); // Start full
  const [spinnerColor, setSpinnerColor] = useState("#004777"); // Set initial color

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime > 1) {
        const newFilledPercent = (remainingTime / duration) * 100;
        setRemainingTime((prev) => prev - 1);
        setFilledPercent(newFilledPercent);

        setSpinnerColor("#004777");
      } else {
        // When time reaches 0, set spinner color to gray
        setSpinnerColor("gray");
        clearInterval(intervalId);
        if (onComplete().shouldRepeat) {
          setRemainingTime(duration);
          setFilledPercent(100); // Reset filled percent to 100%
          setSpinnerColor("#004777"); // Reset spinner color if needed
          // Additional logic can be added here if needed
        }
      }
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [remainingTime]);

  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference -
    (circumference * (filledPercent > 50 ? filledPercent - 9 : filledPercent)) /
      100;

  return (
    <svg width={radius * 2} height={radius * 2}>
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        stroke="#D9D9D9"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        stroke={spinnerColor} // Use dynamic spinner color
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text
        x={radius}
        y={radius}
        textAnchor="middle"
        dominantBaseline="central"
        fill={textColor}
        fontSize={fontSize}>
        {remainingTime}
      </text>
    </svg>
  );
};
