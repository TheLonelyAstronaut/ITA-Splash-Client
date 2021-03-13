import { User } from '../../app/authentication/authentication.types';
import { UserOutput } from '../types/user.types';

import { fromPlaylistOutput } from './to-playlist.mapper';

export const fromUserOutput = (userOutput: UserOutput, token: string): User => {
    return {
        ...userOutput.getCurrentUser,
        playlists: userOutput.getCurrentUser.playlists.map(fromPlaylistOutput),
    };
};
