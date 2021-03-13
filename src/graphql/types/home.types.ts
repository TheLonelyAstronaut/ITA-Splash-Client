import { AlbumPreview, ArtistPreview, PlaylistPreview } from '../../app/home/home.types';

import { ArtistOutput } from './artist.types';
import { AlbumOutput, PlaylistOutput } from './music-data.types';

export type HomepageOutput = (ArtistPreview | AlbumPreview | PlaylistPreview)[];

export type HomepageDataOutput = {
    getHomepage: HomepageMapperData[];
};

export type HomepageMapperData = {
    title: string;
    data: HomepageOutput;
};
