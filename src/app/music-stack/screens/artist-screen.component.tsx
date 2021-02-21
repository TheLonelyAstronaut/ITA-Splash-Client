import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingContainer } from '../../ui/container.component';
import { LOAD_ARTIST } from '../actions';
import { MusicStackNavigationProps } from '../routing.params';
import { getArtist, getIsMusicScreenFetching, getMusicScreenError } from '../selectors';

export type MusicDataProps = MusicStackNavigationProps<'ArtistScreen'>;

export const ArtistScreenComponent: React.FC<MusicDataProps> = (props: MusicDataProps) => {
    const artist = useSelector(getArtist(props.route.params.id));
    const error = useSelector(getMusicScreenError(props.route.key));
    const isLoading = useSelector(getIsMusicScreenFetching(props.route.key));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            LOAD_ARTIST.TRIGGER({
                id: props.route.params.id,
                key: props.route.key,
            })
        );
    }, [dispatch, props]);

    if (error) {
        return null;
    } else if (isLoading || !artist) {
        return <LoadingContainer />;
    } else {
        return (
            <View style={{ paddingVertical: getStatusBarHeight() }}>
                <Text>Musician screen</Text>
                <Button
                    title={'Show albums'}
                    onPress={() => {
                        props.navigation.navigate('AlbumsScreen', {
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            albums: artist.albums!,
                        });
                    }}
                />
            </View>
        );
    }
};
