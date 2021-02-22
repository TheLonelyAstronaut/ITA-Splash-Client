import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import AnimatedGradientTransition from '../../ui/animated-gradient-transition.component';
import { Container } from '../../ui/container.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import I18n from '../../utils/i18n';
import { SEARCH_ALL } from '../actions';
import { SearchResultComponent } from '../components/search-result.component';
import { SearchNavigationProps } from '../routing.params';
import { SearchResult } from '../search.types';
import { getIsFetching, getSearchResults } from '../selectors';

export const SearchInput = styled.TextInput`
    width: ${DEVICE_SIZE.width * 0.8};
    height: 45px;
    border-width: 1px;
    align-self: center;
    margin-top: ${(props) => props.theme.spacer}px;
    margin-bottom: ${(props) => props.theme.spacer * 3}px;
    padding-left: ${(props) => props.theme.spacer * 2}px;
    background-color: ${(props) => props.theme.colors.main};
    border-color: ${(props) => props.theme.colors.additivePink};
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small};
`;

export const Header = styled(BoldText)`
    font-size: ${(props) => props.theme.fontSize.extraLarge};
    margin-left: ${(props) => props.theme.spacer * 5};
    margin-top: ${(props) => props.theme.spacer * 8};
    margin-bottom: ${(props) => props.theme.spacer};
`;

export const EmptyText = styled(RegularText)`
    color: ${(props) => props.theme.colors.inputBackground};
    text-align: center;
    margin-top: 60%;
    font-size: ${(props) => props.theme.fontSize.large};
`;

export const Indicator = styled.ActivityIndicator`
    margin-top: 60%;
`;

export const Separator = styled.View`
    margin-bottom: ${(props) => props.theme.spacer * 2};
`;

export type SearchScreenProps = SearchNavigationProps<'SearchScreen'>;

export const SearchScreenComponent: React.FC<SearchScreenProps> = (props: SearchScreenProps) => {
    const theme = useTheme();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const results = useSelector(getSearchResults);
    const isFetching = useSelector(getIsFetching);

    const renderItem: ListRenderItem<SearchResult> = useCallback(
        ({ item }) => {
            return <SearchResultComponent {...item} navigation={props.navigation} />;
        },
        [props.navigation]
    );

    return (
        <Container>
            <AnimatedGradientTransition
                colors={[
                    theme.colors.additivePink,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                ]}
                style={{ flex: 1 }}
            >
                <Header>{I18n.t('search.search')}</Header>
                <SearchInput
                    placeholder={I18n.t('search.typeToSearch')}
                    placeholderTextColor={theme.colors.inputBackground}
                    onChangeText={useCallback(
                        (val) => {
                            setSearch(val);
                            dispatch(SEARCH_ALL.TRIGGER(val));
                        },
                        [dispatch]
                    )}
                />
                {search ? (
                    !isFetching ? (
                        <FlatList<SearchResult>
                            data={results}
                            renderItem={renderItem}
                            ListEmptyComponent={
                                !results.length ? <EmptyText>{I18n.t('search.nothingFounded')}</EmptyText> : null
                            }
                            keyExtractor={(item, index) => index + Math.random().toString()}
                            ItemSeparatorComponent={Separator}
                        />
                    ) : (
                        <Indicator collapsable={true} />
                    )
                ) : (
                    <EmptyText>{I18n.t('search.typeSomething')}</EmptyText>
                )}
            </AnimatedGradientTransition>
        </Container>
    );
};
