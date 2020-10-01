import React from 'react';


// import avatar from '../../assets/avatar-profile-male.jpg'
import avatar from '../../assets/avatar-profile-female.jpg'

import {
    ProfileContainer,
    ProfileBox,
    Avatar,
    UserName,
    LogoutBtn,
    LogoutIcon
} from "./styles";

const UserProfile = () => {

    return(
        <ProfileContainer>
                <ProfileBox>
                    <Avatar src={avatar}/>
                    <UserName>Fulano da Silva Júnior De Almeidasfsfsdf</UserName>
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