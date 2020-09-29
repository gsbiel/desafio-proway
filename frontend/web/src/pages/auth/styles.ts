import styled from 'styled-components';
import sportsImage from '../../assets/sports_drawing.jpeg'

export const AuthContainer = styled.div`
    position: relative;
    width:100%;
    height:100%;
    background-image: url(${sportsImage});
    background-size: cover;
    background-repeat: no-repeat;
`;

export const FakeOpacityBox = styled.div`
    position: absolute;
    width: 100%;
    height:100%;
    background-color: rgba(255, 255, 255, 0.88);
    z-index: 2;
`;
