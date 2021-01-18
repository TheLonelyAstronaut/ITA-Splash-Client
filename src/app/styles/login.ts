import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: ${(props) => props.theme.colors.main};
    flex: 1;
`;
export const Title = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-size: 48px;
    margin-top: 5%;
    font-weight: 800;
    text-align: center;
`;
export const Logo = styled.Image`
    width: 180px;
    height: 180px;
    align-self: center;
    margin-top: 25%;
`;
export const InputArea = styled.View`
    background-color: ${(props) => props.theme.colors.secondary};
    width: 350px;
    height: 350px;
    align-self: center;
    margin-top: 15%;
    border-radius: 20px;
`;
export const Input = styled.TextInput`
    height: 45px;
    width: 300px;
    border-width: 1px;
    align-self: center;
    margin-top: 8px;
    border-radius: 10px;
    padding-left: 8px;
    background-color: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.main};
    color: ${(props) => props.theme.colors.main};
`;
export const EmailText = styled.Text`
    font-weight: 700;
    font-size: 18px;
    margin-left: 25px;
    margin-top: 15%;
    color: ${(props) => props.theme.colors.main};
`;
export const PasswordText = styled.Text`
    font-weight: 700;
    font-size: 18px;
    margin-left: 25px;
    margin-top: 5%;
    color: ${(props) => props.theme.colors.main};
`;
export const LoginButton = styled.TouchableOpacity`
    width: 300px;
    height: 45px;
    border-radius: 50px;
    background-color: #2962ff;
    align-self: center;
    margin-top: 10%;
`;
export const LoginText = styled.Text`
    color: white;
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    margin-top: 11px;
`;
export const RegisterText = styled.Text`
    text-align: center;
    color: #2962ff;
    font-size: 18px;
    font-weight: 600;
    margin-top: 13px;
`;
export const RegisterInputArea = styled.View`
    background-color: white;
    width: 350px;
    height: 450px;
    align-self: center;
    margin-top: 15%;
    border-radius: 20px;
`;
export const RegisterInputText = styled.Text`
    font-weight: 700;
    font-size: 18px;
    margin-left: 25px;
    margin-top: 5%;
`;
export const RegisterButton = styled.TouchableOpacity`
    width: 300px;
    height: 45px;
    border-radius: 50px;
    background-color: #2962ff;
    align-self: center;
    margin-top: 18px;
`;
