import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';

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
import { painelLogout } from '../../store/actions/painel';
import { authResetState } from '../../store/actions/auth';

const UserProfile = () => {

    const gender = useSelector( (state: RootState) => state.auth.gender )
    const userName = useSelector( (state: RootState) => state.auth.userName )
    const history = useHistory();
    const dispatch = useDispatch();

    const onLogoutHandler = () => {
        dispatch(authResetState())
        dispatch(painelLogout());
        history.push("/login");
    }

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
                        onClick={() => onLogoutHandler()}
                    >
                        Logout
                    </LogoutBtn>
                </ProfileBox>
        </ProfileContainer>
    );
}

export default UserProfile;