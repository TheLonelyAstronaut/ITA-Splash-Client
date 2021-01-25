import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { HomeStack } from '../home/routing';
import { LibraryStackComponent } from '../library/routing';
import { SearchStackComponent } from '../search/routing';

import { TabsParamList } from './app-tabs.params';
import HomeSVG from '../ui/navigation/tab-icon.component';
import AnimatedTabBar, { TabsConfig, FlashyTabBarItemConfig } from '@gorhom/animated-tabbar';

export interface DummyScreenParams {
    name: string;
    backgroundColor: string;
    nextScreen: string;
    paddingBottom?: number;
}

export type MainTabsParams = {
    Home: DummyScreenParams;
    Search: DummyScreenParams;
    Library: DummyScreenParams;
};

const Tab = createBottomTabNavigator<MainTabsParams>();

const tabs: TabsConfig<FlashyTabBarItemConfig, MainTabsParams> = {
    Home: {
        labelStyle: {
            color: '#5B37B7',
        },
        icon: {
            component: HomeSVG,
            color: 'rgba(91,55,183,0.5)',
        },
    },
    Search: {
        labelStyle: {
            color: '#E6A919',
        },
        icon: {
            component: HomeSVG,
            color: 'rgba(230,169,25,0.5)',
        },
    },
    Library: {
        labelStyle: {
            color: '#5B37B7',
        },
        icon: {
            component: HomeSVG,
            color: 'rgba(91,55,183,0.5)',
        },
    },
};

const AppTabs: React.FC = () => {
    return (
        <Tab.Navigator tabBar={(props) => <AnimatedTabBar preset="flashy" tabs={tabs} {...props} />}>
            <Tab.Screen
                name="Home"
                initialParams={{
                    backgroundColor: 'black',
                    nextScreen: 'Likes',
                }}
                component={HomeStack}
            />
            <Tab.Screen
                name="Search"
                initialParams={{
                    backgroundColor: 'black',
                    nextScreen: 'Search',
                }}
                component={SearchStackComponent}
            />
            <Tab.Screen
                name="Library"
                initialParams={{
                    backgroundColor: 'black',
                    nextScreen: 'Profile',
                }}
                component={LibraryStackComponent}
            />
        </Tab.Navigator>
    );
};

export default AppTabs;
