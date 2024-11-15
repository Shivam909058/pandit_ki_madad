import React from "react";
import "./SentimentChart.css";

export const SentimentChart = ({ positive, negative, neutral, data }) => {
  const total = positive + negative + neutral;
  
  const formatPercentage = (value) => {
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <>
      {data && total > 0 && (
        <div className="sentiment-stats">
          <h3>Sentiment Analysis</h3>
          <ul>
            <li style={{ color: "green" }}>
              Positive: {formatPercentage(positive)}%
            </li>
            <li style={{ color: "red" }}>
              Negative: {formatPercentage(negative)}%
            </li>
            <li>
              Neutral: {formatPercentage(neutral)}%
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
