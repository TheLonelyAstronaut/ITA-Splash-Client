import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItemInfo, SectionList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { RenderDataProp } from '../../../mocks/home-mock';
import AnimatedGradientTransition from '../../ui/animated-gradient-transition.component';
import { Container } from '../../ui/styled/container.styled';
import I18n from '../../utils/i18n';
import { LOAD_HOME_DATA } from '../actions';
import { HomeItemComponent } from '../components/home-item.component';
import { ListHeader } from '../components/list-header.component';
import {
    ErrorText,
    ErrorWrapper,
    Indicator,
    SectionTitle,
    TryAgainButton,
    TryAgainText,
} from '../components/styled/home-screen.styled';
import { HomeScreenProps } from '../routing.params';
import { getError, getHomepageData, getIsFetching } from '../selectors';

export const HomeScreenComponent: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const data = useSelector(getHomepageData);
    const isFetching = useSelector(getIsFetching);
    const error = useSelector(getError);

    const handleReload = useCallback(() => {
        dispatch(LOAD_HOME_DATA.TRIGGER());
    }, [dispatch]);

    useEffect(() => {
        handleReload();
    }, [handleReload]);

    const renderSectionListItem = useCallback(
        ({ item }: ListRenderItemInfo<RenderDataProp>) => {
            return (
                <FlatList
                    horizontal={true}
                    data={item}
                    renderItem={(item) => <HomeItemComponent data={item.item} navigation={props.navigation} />}
                    keyExtractor={(item) => item.name + Math.random().toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: theme.spacer * 3 }}
                />
            );
        },
        [props.navigation, theme.spacer]
    );

    return (
        <Container>
            <AnimatedGradientTransition
                colors={[
                    theme.colors.additiveBlue,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                ]}
            >
                {isFetching ? (
                    <View>
                        <Indicator />
                    </View>
                ) : error ? (
                    <ErrorWrapper>
                        <ErrorText>{I18n.t('home.error')}</ErrorText>
                        <TryAgainButton onPress={handleReload}>
                            <TryAgainText>{I18n.t('home.tryAgain')}</TryAgainText>
                        </TryAgainButton>
                    </ErrorWrapper>
                ) : (
                    <SectionList
                        sections={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderSectionListItem}
                        renderSectionHeader={({ section: { title } }) => <SectionTitle>{title}</SectionTitle>}
                        keyExtractor={(item) => item + Math.random().toString()}
                        stickySectionHeadersEnabled={false}
                        contentContainerStyle={{ paddingVertical: theme.widgetHeight }}
                        ListHeaderComponent={ListHeader}
                    />
                )}
            </AnimatedGradientTransition>
        </Container>
    );
};
