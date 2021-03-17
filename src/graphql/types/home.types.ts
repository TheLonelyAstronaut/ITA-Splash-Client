import { AlbumPreview, ArtistPreview, PlaylistPreview } from '../../app/home/home.types';

export type HomepageOutput = (ArtistPreview | AlbumPreview | PlaylistPreview)[];

export type HomepageDataOutput = {
    getHomepage: HomepageMapperData[];
};

export type HomepageMapperData = {
    title: string;
    data: HomepageOutput;
};
