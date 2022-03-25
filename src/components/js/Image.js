import React from "react";
import TerroidImg from "../../images/Terroid.png";
import "../css/image.css";

export default function() {
    return (
        <div className="image--imagediv">
            <img src={TerroidImg} className="image--img" />
        </div>
    )
}