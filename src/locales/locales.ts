import { DefaultLocale } from './default-locale';

const en: DefaultLocale = {
    // Email: 'Email',
    // Password: 'Password',
    // SignIn: 'Sign In',
    // SignUp: 'Sign Up',
    // RepeatPassword: 'Repeat password',
    // Name: 'Name',
    auth: {
        email: 'Email',
        password: 'Password',
        repeatPassword: 'Repeat password',
        name: 'Name',
        signIn: 'Sign In',
        signUp: 'Sign Up',
    },
};

const ru: DefaultLocale = {
    // Email: 'Электронная почта',
    // Password: 'Пароль',
    // SignIn: 'Войти',
    // SignUp: 'Регистрация',
    // RepeatPassword: 'Повторите пароль',
    // Name: 'Имя',
    auth: {
        email: 'Электронная почта',
        password: 'Пароль',
        repeatPassword: 'Повторите пароль',
        name: 'Имя',
        signIn: 'Войти',
        signUp: 'Регистрация',
    },
};

export { en, ru };
