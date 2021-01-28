import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { BackHandler, StatusBar } from 'react-native';
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
    height: ${(props) => props.theme.widgetHeight}px;
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
    const [currentState, setCurrentState] = React.useState(0);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => [props.paddingBottom, DEVICE_SIZE.height], [props.paddingBottom]);

    const handleSheetChanges = useCallback((index: number) => {
        if (!wasInitialized) {
            setWasInitialized(true);
        }

        setCurrentState(index);

        if (index) {
            StatusBar.setHidden(true, 'slide');
            //hideNavigationBar();
        } else {
            StatusBar.setHidden(false, 'slide');
            //showNavigationBar();
        }
        // We dont need to update it
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const sub = BackHandler.addEventListener('hardwareBackPress', () => {
            if (currentState) {
                bottomSheetRef.current?.snapTo(0);
                return true;
            }

            return false;
        });

        return () => sub.remove();
    }, [bottomSheetRef, currentState]);

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
