import React, { Component } from "react";

import { IUserAvatarProps } from "../../models/User";

import './UserAvatar.scss';

class UserAvatar extends Component<IUserAvatarProps, {}> {

    render() {
        const { user, withoutName } = this.props;
        return (
            <div className={"d-none d-md-block text-center"}>
                <div className={`avatar-niveau${withoutName ? ' without-name' : ''}`}>
                    {
                        user?.image_avatar ? (
                            <img src={process.env.PUBLIC_URL + user.image_avatar} alt="Avatar" />
                        ) : <span className={"d-none"}></span>
                    }
                    <p className={"niveau mb-0 color-primary-light"}><strong>{user?.niveau}</strong></p>
                </div>
                <h4 className={`color-primary${withoutName ? ' d-none' : ''}`}><strong>{user?.nom}</strong></h4>
                <p className={`color-primary${withoutName ? ' d-none' : ''}`}></p>
            </div>
        );
    }
}

export default UserAvatar;