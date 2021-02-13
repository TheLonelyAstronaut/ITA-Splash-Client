import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { library } from '../../../mocks/library';
import { Container } from '../../ui/container.component';
import { BoldText } from '../../ui/text.component';
import { LOAD_LIBRARY } from '../actions';
import { PlaylistItem } from '../playlist-item.component';
import { getLibrary } from '../selectors';

export const HeaderText = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.extraLarge};
    margin-left: ${(props) => props.theme.spacer * 3};
    margin-top: ${(props) => props.theme.spacer * 3};
    margin-bottom: ${(props) => props.theme.spacer * 3};
`;

export const LibraryScreen: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LOAD_LIBRARY.COMPLETED(library));
    }, [dispatch]);

    const data = useSelector(getLibrary);

    console.log(data);

    return (
        <Container>
            <HeaderText>Music</HeaderText>
            <FlatList
                data={data}
                renderItem={(item) => <PlaylistItem name={item.item.data.name} data={item.item} />}
                keyExtractor={(item) => item.data.id.toString()}
            />
        </Container>
    );
};
