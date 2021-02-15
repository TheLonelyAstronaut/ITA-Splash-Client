import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { Container } from '../../ui/container.component';
import { SearchArtistComponent } from '../../ui/search-artis.component';
import { SearchTrackComponent } from '../../ui/search-track.component';
import { RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import { SEARCH_ALL } from '../actions';
import { SearchResult, SearchResultType } from '../search.types';
import { getIsFetching, getSearchResults } from '../selectors';

export const SearchInput = styled.TextInput`
    width: ${DEVICE_SIZE.width * 0.8};
    height: 45px;
    border-width: 1px;
    align-self: center;
    margin-top: ${(props) => props.theme.spacer}px;
    padding-left: ${(props) => props.theme.spacer * 2}px;
    background-color: ${(props) => props.theme.colors.inputBackground};
    border-color: ${(props) => props.theme.colors.additivePink};
    color: ${(props) => props.theme.colors.secondary};
    font-family: ${(props) => props.theme.fontFamily.regular};
    font-size: ${(props) => props.theme.fontSize.medium};
`;

export const Header = styled(RegularText)`
    font-size: ${(props) => props.theme.fontSize.extraLarge};
    margin-left: ${(props) => props.theme.spacer * 5};
    margin-top: ${(props) => props.theme.spacer * 8};
`;

export const EmptyText = styled(RegularText)`
    color: ${(props) => props.theme.colors.contrast};
    text-align: center;
    margin-top: 60%;
    font-size: ${(props) => props.theme.fontSize.large};
`;

export const Indicator = styled.ActivityIndicator`
    margin-top: 60%;
`;

export const SearchScreenComponent: React.FC = () => {
    const theme = useTheme();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const results = useSelector(getSearchResults);
    const isFetching = useSelector(getIsFetching);

    const renderItem: ListRenderItem<SearchResult> = ({ item }) => {
        console.log(item);
        if (item.type === SearchResultType.ARTIST) {
            return <SearchArtistComponent title={item.title} artist={item.description} image={item.image} />;
        } else if (item.type === SearchResultType.TRACK) {
            return <SearchTrackComponent title={item.title} artist={item.description} image={item.image} />;
        } else return null;
    };

    return (
        <Container>
            <Header>Search</Header>
            <SearchInput
                placeholder={'Type to search'}
                placeholderTextColor={theme.colors.contrast}
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
                        keyExtractor={(item, index) => index + Math.random().toString()}
                    />
                ) : (
                    <Indicator collapsable={true} />
                )
            ) : (
                <EmptyText>Type something to search</EmptyText>
            )}
        </Container>
    );
};
