import React, { useEffect, useRef } from 'react';
import { ListRenderItemInfo } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';

import { MUSIC_ACTIONS } from '../actions';
import { ControlActions, Track } from '../player.state';
import { getCurrentQueue, getCurrentTrack } from '../selectors';

export type SwipeableTrackChangerProps = {
    getRef?: (ref: Carousel<Track>) => void;
    renderItem: (info: ListRenderItemInfo<Track>) => JSX.Element;
    width: number;
};

export const SwipeableTrackChanger: React.FC<SwipeableTrackChangerProps> = (props: SwipeableTrackChangerProps) => {
    const dispatch = useDispatch();
    const queue = useSelector(getCurrentQueue);
    const currentTrack = useSelector(getCurrentTrack);
    const _carousel = useRef<Carousel<Track>>();

    const changeTrackController = React.useCallback(
        (nextTrack: number) => {
            const currentIndex = queue.findIndex((item) => item.id === currentTrack.id);

            if (nextTrack > currentIndex) {
                dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_NEXT }));
            } else if (nextTrack < currentIndex) {
                dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_PREVIOUS, forceSkip: true }));
            }
        },
        [queue, currentTrack, dispatch]
    );

    useEffect(() => {
        const currentIndex = queue.findIndex((item) => item.id === currentTrack.id);

        if (currentIndex != _carousel?.current?.currentIndex) {
            _carousel?.current?.snapToItem(currentIndex);
        }
    }, [currentTrack, queue, _carousel]);

    return (
        <Carousel
            ref={(ref) => {
                _carousel.current = ref as Carousel<Track>;
                props.getRef && props.getRef(ref as Carousel<Track>);
            }}
            data={queue}
            horizontal={true}
            renderItem={props.renderItem}
            sliderWidth={props.width}
            itemWidth={props.width}
            onSnapToItem={changeTrackController}
        />
    );
};
