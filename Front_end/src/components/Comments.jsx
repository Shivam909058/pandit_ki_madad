import React from "react";
import "./Comment.css";
import "../vars.css";

export const Comments = ({ data, options }) => {
  const getSentimentText = (sentiment) => {
    switch (sentiment) {
      case 1:
        return "Positive";
      case -1:
        return "Negative";
      case 0:
        return "Neutral";
      default:
        return "Unknown";
    }
  };

  return data.map((comment, index) => {
    const sentimentText = getSentimentText(comment.sentiment);
    const sentimentColor = 
      comment.sentiment === 1 ? "green" : 
      comment.sentiment === -1 ? "red" : 
      "var(--color-text)";

    return (
      <div key={index}>
        {options === "All" ? (
          <div className="comm">
            <span className="commentdata" style={{ color: sentimentColor }}>
              {comment.comment}
            </span>
            <span className="sentiment">{sentimentText}</span>
          </div>
        ) : options === "Positive" ? (
          <div className="comm">
            <span className="commentdata">
              {comment.sentiment === 1 && comment.comment}
            </span>
          </div>
        ) : options === "Negative" ? (
          <div className="comm">
            <span className="commentdata">
              {comment.sentiment === -1 && comment.comment}
            </span>
          </div>
        ) : options === "Nutural" ? (
          <div className="comm">
            <span className="commentdata">
              {comment.sentiment === 0 && comment.comment}
            </span>
          </div>
        ) : (
          <h3>data is not present</h3>
        )}
      </div>
    );
  });
};
