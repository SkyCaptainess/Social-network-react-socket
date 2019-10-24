import React from "react";

export function ProfilePic({ firstName, lastName, imgUrl }) {
    console.log("props is profile pic: ", firstName, lastName, imgUrl);
    imgUrl = imgUrl || "/img/default.png";
    return (
        <div>
            <h2>
                I am the profile pic {firstName} {lastName}
            </h2>
            <img src={imgUrl} alt={lastName} />
        </div>
    );
}
