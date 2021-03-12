import { ArtistOutput } from './artist.types';
import { AlbumOutput, PlaylistOutput } from './music-data.types';

export type HomepageData = ArtistOutput | AlbumOutput | PlaylistOutput;

export type HomepageDataOutput = {
    title: string;
    data: HomepageData[];
};
