import styled from 'styled-components/native';

import { DEVICE_SIZE } from '../../../ui/themes/themes';

export type Props = {
    valid?: boolean;
};

export const Title = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.large}px;
    text-align: center;
    font-family: ${(props) => props.theme.logoFont};
    margin-top: ${(props) => props.theme.spacer * 1.5}px;
`;

export const LogoContainer = styled.View`
    width: ${DEVICE_SIZE.width * 0.35}px;
    height: ${(props) => props.theme.spacer * 5}px;
    background-color: ${(props) => props.theme.colors.main};
    margin-left: ${(props) => props.theme.spacer * 6}px;
    margin-top: 40%;
    padding-horizontal: 10px;
`;

export const InputArea = styled.View`
    width: ${DEVICE_SIZE.width * 0.83}px;
    height: 360px;
    align-self: center;
    margin-top: 45%;
    padding-horizontal: ${(props) => props.theme.spacer * 3}px;
    padding-top: ${(props) => props.theme.spacer * 4}px;
`;

export const Input = styled.TextInput<Props>`
    height: 45px;
    width: ${DEVICE_SIZE.width * 0.71}px;
    border-width: 1px;
    align-self: center;
    margin-top: ${(props) => props.theme.spacer * 3}px;
    padding-left: ${(props) => props.theme.spacer}px;
    background-color: ${(props) => props.theme.colors.main};
    border-color: ${(props) => props.theme.colors.additivePink};
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    font-weight: 600;
`;

export const ValidationInput = styled(Input)<Props>`
    border-color: ${(props) => (props.valid ? props.theme.colors.additivePink : 'red')};
`;

export const LoginText = styled.Text`
    color: white;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    text-align: center;
    margin-top: ${(props) => props.theme.spacer}px;
    font-weight: 700;
`;

export const SignUpText = styled.Text`
    text-align: center;
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    margin-top: ${(props) => props.theme.spacer * 2.5}px;
    font-weight: 600;
`;

export const BackgroundImage = styled.ImageBackground`
    width: ${DEVICE_SIZE.width}px;
    height: ${DEVICE_SIZE.height + 2}px;
    position: absolute;
`;

export const RawInputText = styled.Text`
    font-size: ${(props) => props.theme.fontSize.medium}px;
    margin-top: ${(props) => props.theme.spacer}%;
    color: ${(props) => props.theme.colors.secondary};
    font-weight: 700;
    background-color: ${(props) => props.theme.colors.main};
    padding-horizontal: 10px;
    padding-vertical: 5px;
`;

export const TextWrapper = styled.View`
    flex-direction: row;
`;
