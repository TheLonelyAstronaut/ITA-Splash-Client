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
    search: {
        search: 'Search',
        typeToSearch: 'Type to search',
        typeSomething: 'Type something to search',
        nothingFounded: 'Nothing founded',
        artist: 'Artist',
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
    search: {
        search: 'Поиск',
        typeToSearch: 'Введите для поиска',
        typeSomething: 'Введите что-то для поиска',
        nothingFounded: 'Ничего не найдено',
        artist: 'Исполнитель',
    },
};

export { en, ru };
