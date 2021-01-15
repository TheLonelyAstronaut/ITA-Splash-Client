import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

//import { Container, Title, InputArea, Input, EmailText, PasswordText, LoginButton, LoginText, Logo, RegisterText } from '../../styles/login';
import { AuthNavProps } from '../auth-param-list.component';

function LoginScreen({ navigation }: AuthNavProps<'Login'>) {
    return (
        <View></View>
        // <Container>
        //     <Logo source={require('../../assets/logo.jpg')}/>
        //     <Title>Splash</Title>
        //     <InputArea>
        //         <EmailText>Email</EmailText>
        //         <Input />
        //         <PasswordText>Password</PasswordText>
        //         <Input secureTextEntry={true}/>
        //         <LoginButton activeOpacity={0.5}>
        //             <LoginText>Sign in</LoginText>
        //         </LoginButton>
        //         <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate("Register")}>
        //             <RegisterText>Sign up</RegisterText>
        //         </TouchableOpacity>
        //     </InputArea>
        // </Container>
    );
}

export default LoginScreen;
