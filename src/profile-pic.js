import React from "react";

export function ProfilePic({ imgUrl, toggleModal }) {
    imgUrl = imgUrl || "/default.jpg";

    return (
        <div>
            <img onClick={toggleModal} src={imgUrl} />
        </div>
    );
}
