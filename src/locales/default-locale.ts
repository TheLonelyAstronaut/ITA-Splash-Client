export interface DefaultLocale {
    auth: {
        email: string;
        password: string;
        repeatPassword: string;
        signIn: string;
        signUp: string;
        name: string;
    };
    library: {
        music: string;
        favoriteTracks: string;
        addNewPlaylist: string;
        tracks: string;
        comeUpPlaylistName: string;
        create: string;
        emptyPlaylist: string;
    };
    settings: {
        dark: string;
        light: string;
        japanese: string;
        theme: string;
        changePassword: string;
        currentPassword: string;
        newPassword: string;
        repeatNewPassword: string;
        edit: string;
        saveChanges: string;
    };
    home: {
        welcome: string;
        recentlyPlayed: string;
        recommendedArtists: string;
        popularAlbums: string;
        newReleases: string;
        error: string;
        tryAgain: string;
    };
    search: {
        typeToSearch: string;
        search: string;
        typeSomething: string;
        nothingFounded: string;
        artist: string;
    };
    artist: {
        popularTracks: string;
        popularReleases: string;
        similarArtists: string;
        discography: string;
    };
    additional: {
        choosePlaylist: string;
    };
}
