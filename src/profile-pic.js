import React from "react";

export function ProfilePic({ imgUrl }) {
    imgUrl = imgUrl || "/img/default.png";

    return (
        <div>
            <img src={imgUrl} />
        </div>
    );
}
