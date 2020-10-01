import React from 'react';
import {useSelector} from 'react-redux';

import otherAvatar from '../../assets/avatar-profile-other.png'
import maleAvatar from '../../assets/avatar-profile-male.jpg'
import femaleAvatar from '../../assets/avatar-profile-female.jpg'

import {
    RootState
} from '../../index';

import {
    ProfileContainer,
    ProfileBox,
    Avatar,
    UserName,
    LogoutBtn,
    LogoutIcon
} from "./styles";

const UserProfile = () => {

    const gender = useSelector( (state: RootState) => state.auth.gender )
    const userName = useSelector( (state: RootState) => state.auth.userName )

    let avatar = ""
    if(gender == "m"){
        avatar = maleAvatar
    }else if(gender == "f"){
        avatar = femaleAvatar
    }else{
        avatar = otherAvatar
    }

    return(
        <ProfileContainer>
                <ProfileBox>
                    <Avatar src={avatar}/>
                    <UserName>{userName}</UserName>
                    <LogoutBtn 
                        variant="contained"
                        color="secondary"
                        startIcon={<LogoutIcon />}
                    >
                        Logout
                    </LogoutBtn>
                </ProfileBox>
        </ProfileContainer>
    );
}

export default UserProfile;