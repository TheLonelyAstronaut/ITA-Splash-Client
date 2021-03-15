import ExtendedMap from './extended-map';
import { Artist } from '../../types/music';

export const getArtistFromMap = (artists: ExtendedMap<number, Artist>, id: number): Artist => {
    return artists.get(id)!;
};
