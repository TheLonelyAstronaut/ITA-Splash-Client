import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItemInfo, SectionList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { RenderDataProp } from '../../../mocks/home-mock';
import AnimatedGradientTransition from '../../ui/animated-gradient-transition.component';
import { Container } from '../../ui/container.component';
import { RegularText } from '../../ui/text.component';
import I18n from '../../utils/i18n';
import { LOAD_HOME_DATA } from '../actions';
import { HomeItemComponent } from '../components/home-item.component';
import { ListHeader } from '../components/list-header.component';
import { HomeNavigationProps } from '../routing.params';
import { getError, getHomepageData, getIsFetching } from '../selectors';

export type HomeScreenProps = HomeNavigationProps<'HomeScreen'>;

export const SectionTitle = styled(RegularText)`
    margin-left: ${(props) => props.theme.spacer * 2 + 2};
    margin-top: ${(props) => props.theme.spacer * 5};
    margin-bottom: ${(props) => props.theme.spacer * 2};
    font-size: ${(props) => props.theme.fontSize.extraLarge};
    font-weight: 700;
`;

export const Indicator = styled.ActivityIndicator`
    margin-top: 70%;
`;

export const ErrorWrapper = styled.View`
    margin-top: 80%;
    align-self: center;
`;

export const ErrorText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.medium};
`;

export const TryAgainButton = styled.TouchableOpacity`
    width: 90px;
    height: 25px;
    background-color: ${(props) => props.theme.colors.additivePink};
    margin-left: ${(props) => props.theme.spacer * 8};
    margin-top: ${(props) => props.theme.spacer * 2};
`;

export const TryAgainText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small};
    align-self: center;
    margin-top: ${(props) => props.theme.spacer * 0.4};
`;

export const HomeScreenComponent: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const data = useSelector(getHomepageData);
    const isFetching = useSelector(getIsFetching);
    const error = useSelector(getError);

    useEffect(() => {
        dispatch(LOAD_HOME_DATA.TRIGGER(1));
    }, [dispatch]);

    const handleReload = useCallback(
        (id: number) => {
            dispatch(LOAD_HOME_DATA.TRIGGER(id));
        },
        [dispatch]
    );

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
                        <TryAgainButton onPress={() => handleReload(1)}>
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
