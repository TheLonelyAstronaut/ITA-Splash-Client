import React, { useEffect, useMemo, useRef } from 'react';
import { ListRenderItemInfo } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';

import { Track } from '../../../types/music';
import { MUSIC_ACTIONS } from '../actions';
import { ControlActions } from '../player.types';
import { getCurrentQueue, getCurrentTrack } from '../selectors';

export type SwipeableTrackChangerProps = {
    getRef?: (ref: Carousel<Track>) => void;
    renderItem: (info: ListRenderItemInfo<Track>) => JSX.Element;
    width: number;
    height: number;
    onSnapToItem?: (index: number) => void;
};

export const SwipeableTrackChanger: React.FC<SwipeableTrackChangerProps> = (props: SwipeableTrackChangerProps) => {
    const dispatch = useDispatch();
    const queue = useSelector(getCurrentQueue);
    const currentTrack = useSelector(getCurrentTrack);
    const currentIndex = queue.findIndex((item) => item.id === currentTrack.id);
    // eslint-disable-next-line
    const initialIndex = useMemo(() => currentIndex, []);
    const _carousel = useRef<Carousel<Track>>();

    const changeTrackController = React.useCallback(
        (nextTrack: number) => {
            if (nextTrack > currentIndex) {
                dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_NEXT }));
            } else if (nextTrack < currentIndex) {
                dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_PREVIOUS, forceSkip: true }));
            }

            if (props.onSnapToItem) {
                props.onSnapToItem(nextTrack);
            }
        },
        [currentIndex, dispatch, props]
    );

    useEffect(() => {
        if (currentIndex != _carousel?.current?.currentIndex && currentIndex != -1) {
            _carousel?.current?.snapToItem(currentIndex);
        }
    }, [currentIndex, _carousel]);

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
            getItemLayout={(data, index) => ({ length: props.height, offset: props.height * index, index })}
            initialScrollIndex={initialIndex}
            firstItem={initialIndex}
            onSnapToItem={changeTrackController}
            onScrollToIndexFailed={(info) => alert(info)}
        />
    );
};
