import { Album } from '../../../types/music';
import ExtendedMap from '../extended-map';

export const getAlbumsFromMap = (albums: ExtendedMap<number, Album>, id: number): Album => {
    return albums.get(id)!;
};
