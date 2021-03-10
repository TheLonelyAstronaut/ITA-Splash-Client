import analytics from '@react-native-firebase/analytics';

import { Album, Artist, Track } from '../../types/music';
import { User } from '../authentication/authentication.types';
import { ThemesEnum } from '../ui/themes/theme.types';

export class FirebaseAPI {
    login = async (user: User): Promise<void> => {
        await analytics().logEvent('login', user);
    };

    register = async (user: User): Promise<void> => {
        await analytics().logEvent('register', user);
    };

    trackStarted = async (track: Track): Promise<void> => {
        await analytics().logEvent('track_started', track);
    };

    albumOpened = async (album: Album): Promise<void> => {
        await analytics().logEvent('album_opened', album);
    };

    artistOpened = async (artist: Artist): Promise<void> => {
        await analytics().logEvent('artist_opened', artist);
    };

    logout = async (): Promise<void> => {
        await analytics().logEvent('logout');
    };

    follow = async (artist: Artist): Promise<void> => {
        if (artist.isFollowed) {
            await analytics().logEvent('follow', artist);
        } else await analytics().logEvent('unfollow', artist);
    };

    themeChanges = async (theme: ThemesEnum): Promise<void> => {
        if (theme === ThemesEnum.LIGHT) {
            await analytics().logEvent('theme_changed_to_light');
        } else await analytics().logEvent('theme_changed_to_dark');
    };

    passwordChanged = async (): Promise<void> => {
        await analytics().logEvent('password_changed');
    };
}

export const firebase = new FirebaseAPI();
