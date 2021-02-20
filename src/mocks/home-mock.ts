import { SearchResultType } from '../app/search/search.types';
import { Artist, Playlist } from '../types/music';

import { Album, albums } from './albums';
import { artists } from './artists';
import { playlist } from './playlists';
import I18n from '../app/utils/i18n';

export type RenderDataProp = (Artist | Playlist | Album)[];

export interface HomepageData {
    title: string;
    type: SearchResultType;
    data: RenderDataProp[];
}

export const home: HomepageData[] = [
    {
        title: I18n.t('home.recentlyPlayed'),
        type: SearchResultType.PLAYLIST | SearchResultType.ARTIST,
        data: [[...playlist, ...artists, ...albums]],
    },
    {
        title: I18n.t('home.popularAlbums'),
        type: SearchResultType.PLAYLIST,
        data: [albums],
    },
    {
        title: I18n.t('home.recommendedArtists'),
        type: SearchResultType.ARTIST,
        data: [artists],
    },
    {
        title: I18n.t('home.newReleases'),
        type: SearchResultType.PLAYLIST,
        data: [albums],
    },
];
