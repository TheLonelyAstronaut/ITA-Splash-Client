import styled from 'styled-components/native';

import { Input } from '../../../authentication/components/styled/authentication.styled';
import { BoldText, RegularText } from '../../../ui/styled/text.styled';
import { DEVICE_SIZE } from '../../../ui/themes/themes';

export const HeaderText = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.extraLarge};
    margin-left: ${(props) => props.theme.spacer * 3};
    margin-top: ${(props) => props.theme.spacer * 3};
    margin-bottom: ${(props) => props.theme.spacer * 3};
`;

export const AddPlaylistModal = styled.Modal``;

export const ModalView = styled.View`
    flex: 1;
    margin-top: ${(props) => props.theme.spacer * 12 - 5}px;
    border-radius: 20px;
    padding: ${(props) => props.theme.spacer * 4}px;
    align-items: center;
    background-color: ${(props) => props.theme.colors.main};
    height: ${DEVICE_SIZE.height}px;
`;

export const ModalText = styled(RegularText)`
    margin-top: ${(props) => props.theme.spacer * 2};
    font-size: ${(props) => props.theme.fontSize.large};
    margin-bottom: ${(props) => props.theme.spacer * 2};
`;

export const PlaylistInput = styled(Input)`
    margin-top: ${(props) => props.theme.spacer * 2};
    font-size: ${(props) => props.theme.fontSize.large};
    margin-bottom: ${(props) => props.theme.spacer * 2};
`;

export const CrossButton = styled.TouchableOpacity`
    align-self: flex-end;
`;
export const Indicator = styled.ActivityIndicator`
    margin-top: 60%;
`;
