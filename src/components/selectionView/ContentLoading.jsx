import React from "react";
import './styles/ContentLoading.css';

const ContentLoading = props => {
  return (
    <div className="content-loading">
        <img src="/images/react_icon.png" alt="loading" className="loading-image"/>
        <p>Loading content...</p>
    </div>
  );
};

export default ContentLoading;
