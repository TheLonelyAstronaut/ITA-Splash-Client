import { HomepageData } from '../app/home/home.types';
import I18n from '../app/utils/i18n';

import { albums } from './albums';
import { artists } from './artists';

export const home: HomepageData[] = [
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
