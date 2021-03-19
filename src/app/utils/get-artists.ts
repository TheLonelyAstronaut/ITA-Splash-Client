import { Artist } from '../../types/music';

import ExtendedMap from './extended-map';

export const getArtistFromMap = (artists: ExtendedMap<number, Artist>, id: number): Artist => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return artists.get(id)!;
};
