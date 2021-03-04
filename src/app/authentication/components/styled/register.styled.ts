import styled from 'styled-components/native';

import { DEVICE_SIZE } from '../../../ui/themes/themes';

import { LogoContainer as BaseLogoContainer } from './authentication.styled';

export const RegisterInputArea = styled.View`
    width: ${DEVICE_SIZE.width * 0.83}px;
    align-self: center;
    margin-top: 40%;
    padding-horizontal: ${(props) => props.theme.spacer * 3}px;
`;

export const LogoContainer = styled(BaseLogoContainer)`
    background-color: ${(props) => props.theme.colors.main};
    margin-top: 0%;
    margin-left: 0%;
`;

export const BackButtonContainer = styled.TouchableOpacity``;

export const LogoWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: ${DEVICE_SIZE.width * 0.14}px;
    margin-top: 20%;
`;
