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
