import { FlashyTabBarItemConfig, TabsConfig } from '@gorhom/animated-tabbar';
import { DefaultTheme } from 'styled-components/native';

import HomeSVG from '../ui/navigation/svg/home-svg.component';
import LibrarySVG from '../ui/navigation/svg/library-svg.component';
import SearchSVG from '../ui/navigation/svg/search-svg.component';
import { MainTabsParams } from '../ui/navigation/tabs-params.state';

export const generateTabsPreset = (theme: DefaultTheme | undefined) => {
    const tabs: TabsConfig<FlashyTabBarItemConfig, MainTabsParams> = {
        Home: {
            labelStyle: {
                color: theme?.colors.main,
            },
            icon: {
                component: HomeSVG,
                color: `${theme?.colors.main}`,
            },
        },
        Search: {
            labelStyle: {
                color: theme?.colors.main,
            },
            icon: {
                component: SearchSVG,
                color: `${theme?.colors.main}`,
            },
        },
        Library: {
            labelStyle: {
                color: theme?.colors.main,
            },
            icon: {
                component: LibrarySVG,
                color: `${theme?.colors.main}`,
            },
        },
    };
    return { tabs };
};
