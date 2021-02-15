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
    library: {
        music: 'Music',
        favoriteTracks: 'Favorite tracks',
        tracks: 'tracks',
        addNewPlaylist: 'Add new playlist',
        comeUpPlaylistName: 'Come up with a playlist name',
        create: 'Create',
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
    library: {
        music: 'Музыка',
        favoriteTracks: 'Любимые треки',
        tracks: 'треков',
        addNewPlaylist: 'Добавить плейлист',
        comeUpPlaylistName: 'Придумайте название плейлиста',
        create: 'Создать',
    },
};

export { en, ru };
