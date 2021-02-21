export interface DefaultLocale {
    auth: {
        email: string;
        password: string;
        repeatPassword: string;
        signIn: string;
        signUp: string;
        name: string;
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
}
