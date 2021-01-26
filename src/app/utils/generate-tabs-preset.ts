import { FlashyTabBarItemConfig, TabsConfig } from '@gorhom/animated-tabbar';
import { DefaultTheme } from 'styled-components/native';

import { MainTabsParams } from '../routing/app-tabs.params';
import HomeSVG from '../ui/navigation/svg/home-svg.component';
import LibrarySVG from '../ui/navigation/svg/library-svg.component';
import SearchSVG from '../ui/navigation/svg/search-svg.component';

export const generateTabsPreset = (theme: DefaultTheme): TabsConfig<FlashyTabBarItemConfig, MainTabsParams> => ({
    Home: {
        labelStyle: {
            color: theme?.colors.secondary,
        },
        icon: {
            component: HomeSVG,
            color: `${theme?.colors.secondary}`,
        },
    },
    Search: {
        labelStyle: {
            color: theme?.colors.secondary,
        },
        icon: {
            component: SearchSVG,
            color: `${theme?.colors.secondary}`,
        },
    },
    Library: {
        labelStyle: {
            color: theme?.colors.secondary,
        },
        icon: {
            component: LibrarySVG,
            color: `${theme?.colors.secondary}`,
        },
    },
});
