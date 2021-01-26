import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { HomeStack } from '../home/routing';
import { LibraryStackComponent } from '../library/routing';
import { SearchStackComponent } from '../search/routing';
import { CustomTabBar } from '../ui/navigation/custom-tabs.component';

import { MainTabsParams } from './app-tabs.params';

const Tab = createBottomTabNavigator<MainTabsParams>();

const AppTabs: React.FC = () => {
    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar props={props} />}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Search" component={SearchStackComponent} />
            <Tab.Screen name="Library" component={LibraryStackComponent} />
        </Tab.Navigator>
    );
};

export default AppTabs;
