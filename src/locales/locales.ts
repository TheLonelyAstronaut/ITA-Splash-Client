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
    settings: {
        dark: 'Dark',
        light: 'Light',
        japanese: 'Japanese',
        theme: 'Theme',
        changePassword: 'Change password',
        currentPassword: 'Current password',
        newPassword: 'New password',
        repeatNewPassword: 'Repeat new password',
        edit: 'Edit profile',
        saveChanges: 'Save changes',
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
    settings: {
        dark: 'Темная',
        light: 'Светлая',
        japanese: 'Японская',
        theme: 'Тема',
        changePassword: 'Изменить пароль',
        currentPassword: 'Текущий пароль',
        newPassword: 'Новый пароль',
        repeatNewPassword: 'Повторите новый пароль',
        edit: 'Редактировать',
        saveChanges: 'Сохранить изменения',
    },
};

export { en, ru };
