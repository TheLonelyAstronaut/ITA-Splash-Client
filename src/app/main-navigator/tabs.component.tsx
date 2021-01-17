import AnimatedTabBar, { TabsConfig, BubbleTabBarItemConfig } from '@gorhom/animated-tabbar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
//import { Ionicons } from 'react-native-vector-icons';

import { HomeStack } from '../home/home-stack.component';
import { LibraryStackComponent } from '../library/library-stack.component';
import { SearchStackComponent } from '../search/search-stack.component';

import { TabsParamList } from './tabs-param-list';

// const tabs : TabsConfig<BubbleTabBarItemConfig> = {
//     Home: {
//         labelStyle: {
//             color: '#5B37B7',
//         },
//         icon: {
//             component: <Ionicons name="home" size={24} color="black" />,
//             activeColor: 'rgba(91,55,183,1)',
//             inactiveColor: 'rgba(0,0,0,1)',
//         },
//         background: {
//             activeColor: 'rgba(223,215,243,1)',
//             inactiveColor: 'rgba(223,215,243,0)',
//         },
//     },
//     Search: {
//         labelStyle: {
//             color: '#1194AA',
//         },
//         icon: {
//             component: <Ionicons name="search" size={24} color="black" />,
//             activeColor: 'rgba(17,148,170,1)',
//             inactiveColor: 'rgba(0,0,0,1)',
//         },
//         background: {
//             activeColor: 'rgba(207,235,239,1)',
//             inactiveColor: 'rgba(207,235,239,0)',
//         },
//     },
// }

const Tabs = createBottomTabNavigator<TabsParamList>();

export const AppTabs: React.FC = () => {
    return (
        <Tabs.Navigator
        // tabBar={props=>(
        //     <AnimatedTabBar tabs={tabs} {...props}/>
        // )}
        >
            <Tabs.Screen name="Home" component={HomeStack} />
            <Tabs.Screen name="Search" component={SearchStackComponent} />
            <Tabs.Screen name="Library" component={LibraryStackComponent} />
        </Tabs.Navigator>
    );
};
