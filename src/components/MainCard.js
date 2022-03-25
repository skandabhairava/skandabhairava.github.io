import React from "react";
import ImageComponent from "./js/Image";
import TopContact from "./js/TopContact";
import MainContent from "./js/MainContent";
import BottomContact from "./js/BottomContact";

export default function() {
    return (
        <div className="card--container">
            <ImageComponent />
            <TopContact />
            <MainContent />
            <BottomContact />
        </div>
    )
}