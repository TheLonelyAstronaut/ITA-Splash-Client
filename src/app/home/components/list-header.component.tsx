import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { useTheme } from 'styled-components/native';

import I18n from '../../utils/i18n';

import { HeaderWrapper, SettingsIcon, WelcomeText } from './styled/list-header.styled';

export const ListHeader: React.FC = () => {
    const navigation = useNavigation();
    const theme = useTheme();

    return (
        <HeaderWrapper>
            <WelcomeText>{I18n.t('home.welcome')}</WelcomeText>
            <SettingsIcon onPress={() => navigation.navigate('SettingsScreen')}>
                <Icon name={'cog'} size={30} color={theme.colors.secondary} />
            </SettingsIcon>
        </HeaderWrapper>
    );
};
