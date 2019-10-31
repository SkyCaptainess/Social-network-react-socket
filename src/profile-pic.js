import React from "react";

export function ProfilePic({ imgUrl, toggleModal }) {
    imgUrl = imgUrl || "/default.jpg";

    return (
        <div>
            <img onClick={toggleModal} src={imgUrl} />
        </div>
    );
}

// const ProfilePic = ({ first, last, imgUrl='default.jpg'}) => {
//     return (
//             <div>
//                 <img src={imgUrl} />
//             </div>
//         );
// };
//
// export default function ProfilePic();
