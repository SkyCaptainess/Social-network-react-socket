import React from "react";

export function ProfilePic({ imgUrl, toggleModal }) {
    imgUrl = imgUrl || "/img/fission.png";

    return (
        <div>
            <img onClick={toggleModal} src={imgUrl} />
        </div>
    );
}
