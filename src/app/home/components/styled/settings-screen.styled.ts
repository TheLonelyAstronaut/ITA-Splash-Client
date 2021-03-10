import styled from 'styled-components/native';

import { RegularText } from '../../../ui/styled/text.styled';
import { DEVICE_SIZE } from '../../../ui/themes/themes';

export const HeaderButtonsWrapper = styled.View`
    margin-top: ${(props) => props.theme.spacer * 2}px;
    flex-direction: row;
    justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
    margin-left: ${(props) => props.theme.spacer * 2}px;
`;

export const LogoutButton = styled.TouchableOpacity`
    margin-right: ${(props) => props.theme.spacer * 3}px;
`;

export const EditText = styled(RegularText)`
    color: ${(props) => props.theme.colors.main};
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.extraSmall}px;
    margin-top: ${(props) => props.theme.spacer * 0.5}px;
`;

export const ProfileImage = styled.Image`
    width: ${DEVICE_SIZE.width * 0.32}px;
    height: ${DEVICE_SIZE.height * 0.15}px;
    border-radius: 100px;
    align-self: center;
`;
export const Username = styled(RegularText)`
    text-align: center;
    margin-top: ${(props) => props.theme.spacer * 2}px;
    font-size: ${(props) => props.theme.fontSize.large}px;
`;
