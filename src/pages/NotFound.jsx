import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <h1 className="error-code">404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link to="/home">
        <button className="back-btn">Go Back Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
