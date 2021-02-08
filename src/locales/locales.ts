import { DefaultLocale } from './default-locale';

const en: DefaultLocale = {
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
