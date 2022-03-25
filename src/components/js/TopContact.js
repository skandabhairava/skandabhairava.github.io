import React from "react";
import "../css/top_contact.css";

export default function() {
    return (
        <div className="top-contact--main">
            <h1 className="top-contact--title"><b>Terroid</b></h1>
            <h3 className="top-contact--subtitle">Pythonista</h3>
            <div className="top-contact--inline">
                <a className="button-blurple" target="_blank" href="https://discord.gg/uNnNgtBzCy"><i className="fa-brands fa-discord"></i>  Discord</a>
                <a className="button-red" target="_blank" href="https://www.youtube.com/Terroid"><i className="fa-brands fa-youtube"></i>  Youtube</a>    
            </div>
        </div>
    )
}