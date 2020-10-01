import styled, {keyframes} from 'styled-components';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Button from '@material-ui/core/Button';

import {
    colorTheme
} from '../../constants';

export const ProfileContainer = styled.div`
    position: absolute;
    top:0;
    width: 100%;
    height: 100%;
    // background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

export const ProfileBox = styled.div`
    width: 90%;
    height:95%;
    background: #fff;
    border-radius: 20px;
    // background-color: ${colorTheme.primary}
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right, rgba(182,164,219,1) 3%, rgba(255,0,0,0) 98%);
`;

const avatarBorderColor = colorTheme.primaryDark

const animateAvatarBorder = keyframes`
    0% { border: 4px solid ${avatarBorderColor}}
    50% { border: 2px solid ${avatarBorderColor}}
    100% { border: 4px solid ${avatarBorderColor}}
`;

export const Avatar = styled.img`
    width:200px;
    height:200px;
    border-radius: 100px;
    // background-color: #ccc;
    animation: ${animateAvatarBorder} 1s linear infinite alternate;
`;

export const UserName = styled.span`
    color: ${avatarBorderColor};
    font-weight: bolder;
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    text-align: center;
`;

export const LogoutBtn = styled(Button)`
    margin-top: 60px !important;
    width:40%;
    height:50px;  
    text-transform: capitalize !important;
    font-size: 20px !important;
    font-weight: bolder !important;
`;

export const LogoutIcon = styled(AccountCircleIcon)`
    font-size: 30px !important;
    color: #444 !important;
`;
