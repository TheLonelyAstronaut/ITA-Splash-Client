import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import I18n from '../../utils/i18n';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

export const HeaderWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${(props) => props.theme.spacer * 6};
    height: ${(props) => props.theme.fontSize.welcome};
`;

export const WelcomeText = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.welcome};
    font-weight: 700;
    margin-left: ${(props) => props.theme.spacer * 2 + 2};
`;

export const SettingsIcon = styled.TouchableOpacity`
    align-self: flex-end;
    margin-right: ${(props) => props.theme.spacer * 2.5};
`;

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
