import ExtendedMap from './extended-map';
import { Album } from '../../types/music';

export const getAlbumsFromMap = (albums: ExtendedMap<number, Album>, id: number): Album => {
    return albums.get(id)!;
};
