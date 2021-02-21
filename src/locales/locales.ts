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
    home: {
        welcome: 'Welcome',
        recentlyPlayed: 'Recently played',
        popularAlbums: 'Popular albums',
        recommendedArtists: 'Recommended artists',
        newReleases: 'New releases',
        error: 'Oops...something went wrong',
        tryAgain: 'Try again',
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
    home: {
        welcome: 'Добро пожаловать',
        recentlyPlayed: 'Недавно прослушано',
        popularAlbums: 'Популярные альбомы',
        recommendedArtists: 'Советуем исполнителей',
        newReleases: 'Новые релизы',
        error: 'Ууупс...что-то пошло не так',
        tryAgain: 'Снова',
    },
};

export { en, ru };
