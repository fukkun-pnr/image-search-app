import React from "react";

type Props = {
    user: Unsplash.User;
    className?: string;
}

export const UserInfo = React.memo((props: Props) => (
    <div className={props.className ? `user-info ${props.className}` : "user-info"}>
        <a href={props.user.links.html} target="_blank" rel="noopener noreferrer"><img src={props.user.profile_image.small} alt={props.user.username} />{props.user.username}</a>
    </div>
));