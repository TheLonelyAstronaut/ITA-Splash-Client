import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { HomeStackComponent } from '../home/routing';
import { LibraryStackComponent } from '../library/routing';
import { SearchStackComponent } from '../search/routing';
import { CustomTabBar } from '../ui/navigation/custom-tabs.component';

import { MainTabsParams } from './app-tabs.params';

const Tab = createBottomTabNavigator<MainTabsParams>();

const AppTabs: React.FC = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            tabBarOptions={{
                safeAreaInsets: {
                    bottom: 0,
                },
            }}
        >
            <Tab.Screen name={'Home'} component={HomeStackComponent} />
            <Tab.Screen name={'Search'} component={SearchStackComponent} />
            <Tab.Screen name={'Library'} component={LibraryStackComponent} />
        </Tab.Navigator>
    );
};

export default AppTabs;
