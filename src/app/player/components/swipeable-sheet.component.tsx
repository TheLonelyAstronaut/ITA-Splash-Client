import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import Animated, { Extrapolate } from 'react-native-reanimated';
import styled from 'styled-components/native';

import { DEVICE_SIZE } from '../../ui/themes/themes';

import { Player } from './player.component';
import { Widget } from './widget.component';

export const SheetWrapper = styled.View``;

export const SheetBackground = styled.View`
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
    background-color: white;
    position: absolute;
`;

export const AnimatedPlayerWrapper = Animated.createAnimatedComponent(styled.View`
    background-color: transparent;
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
`);

export const AnimatedWidgetWrapper = Animated.createAnimatedComponent(styled.View`
    height: ${(props) => props.theme.tabBarHeight}px;
    position: absolute;
    width: ${DEVICE_SIZE.width}px;
`);

export const BottomSheetBackground = styled.View`
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
    background-color: ${(props) => props.theme.colors.main};
`;

export type Props = {
    paddingBottom: number;
    animatableValue: Animated.Value<number>;
};

export const SwipeableSheet: React.FC<Props> = (props: Props) => {
    const [wasInitialized, setWasInitialized] = React.useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => [props.paddingBottom, DEVICE_SIZE.height], [props.paddingBottom]);

    const handleSheetChanges = useCallback(() => {
        if (!wasInitialized) {
            setWasInitialized(true);
        }
        // We dont need to update it
        // eslint-disable-next-line
    }, []);

    const widgetOpacity = props.animatableValue.interpolate({
        inputRange: [props.paddingBottom, props.paddingBottom * 2],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP,
    });

    const playerOpacity = props.animatableValue.interpolate({
        inputRange: [props.paddingBottom * 2, props.paddingBottom * 4],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
    });

    // renders
    return (
        <SheetWrapper pointerEvents={'auto'}>
            <BottomSheet
                ref={bottomSheetRef}
                handleComponent={null}
                backgroundComponent={BottomSheetBackground}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                animateOnMount={true}
                animatedPosition={wasInitialized ? props.animatableValue : undefined}
            >
                <AnimatedPlayerWrapper
                    style={{
                        opacity: playerOpacity,
                    }}
                >
                    <Player />
                </AnimatedPlayerWrapper>
                <AnimatedWidgetWrapper
                    style={{
                        opacity: widgetOpacity,
                    }}
                >
                    <Widget />
                </AnimatedWidgetWrapper>
            </BottomSheet>
        </SheetWrapper>
    );
};
