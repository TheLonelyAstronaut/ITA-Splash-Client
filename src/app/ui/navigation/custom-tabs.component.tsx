import React from 'react';
import { BubbleTabBarItemConfig, TabsConfig } from '@gorhom/animated-tabbar';
import HomeSVG from './tab-icon.component';

const tabs: TabsConfig<BubbleTabBarItemConfig> = {
    Home: {
        labelStyle: {
            color: '#5B37B7',
        },
        icon: {
            component: HomeSVG,
            activeColor: 'black',
            inactiveColor: 'white',
        },
        background: {
            activeColor: 'black',
            inactiveColor: 'white',
        },
    },
    Search: {
        labelStyle: {
            color: '#1194AA',
        },
        icon: {
            component: HomeSVG,
            activeColor: 'black',
            inactiveColor: 'white',
        },
        background: {
            activeColor: 'black',
            inactiveColor: 'white',
        },
    },
};

export default tabs;
