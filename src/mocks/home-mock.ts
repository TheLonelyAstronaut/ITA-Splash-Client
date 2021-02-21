import { HomepageData } from '../app/home/home.types';
import I18n from '../app/utils/i18n';
import { Artist, Playlist, Album } from '../types/music';

import { albums } from './albums';
import { artists } from './artists';
import { playlist } from './playlists';

export type RenderDataProp = (Artist | Playlist | Album)[];

export const home: HomepageData[] = [
    {
        title: I18n.t('home.recentlyPlayed'),
        data: [[...playlist, ...artists, ...albums]],
    },
    {
        title: I18n.t('home.popularAlbums'),
        data: [albums],
    },
    {
        title: I18n.t('home.recommendedArtists'),
        data: [artists],
    },
    {
        title: I18n.t('home.newReleases'),
        data: [albums],
    },
];
