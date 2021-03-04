import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import AnimatedGradientTransition from '../../ui/animated-gradient-transition.component';
import { Container } from '../../ui/styled/container.styled';
import I18n from '../../utils/i18n';
import { SEARCH_ALL } from '../actions';
import { SearchResultComponent } from '../components/search-result.component';
import { EmptyText, Header, Indicator, SearchInput, Separator } from '../components/styled/search-screen.styled';
import { SearchScreenProps } from '../routing.params';
import { SearchResult } from '../search.types';
import { getIsFetching, getSearchResults } from '../selectors';

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

    const handleSearchInputChange = useCallback(
        (val) => {
            setSearch(val);
            dispatch(SEARCH_ALL.TRIGGER(val));
        },
        [dispatch]
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
                    onChangeText={handleSearchInputChange}
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
