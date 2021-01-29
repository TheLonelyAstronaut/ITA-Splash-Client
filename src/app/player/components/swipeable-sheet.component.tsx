import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { BackHandler, StatusBar, Animated as RNAnimated } from 'react-native';
import Interactable, { ISnapEvent } from 'react-native-interactable';
import { Extrapolate } from 'react-native-reanimated';
import styled, { useTheme } from 'styled-components/native';

import { DEVICE_SIZE } from '../../ui/themes/themes';
import { setPlayerSheetRef } from '../player.ref';

import { Player } from './player.component';
import { Widget } from './widget.component';

export const SheetWrapper = styled.View``;

export const SheetBackground = styled.View`
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
    background-color: white;
    position: absolute;
`;

export const AnimatedPlayerWrapper = RNAnimated.createAnimatedComponent(styled.View`
    background-color: transparent;
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
`);

export const AnimatedWidgetWrapper = RNAnimated.createAnimatedComponent(styled.View`
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
    animatableValue: RNAnimated.Value;
};

export const SwipeableSheet: React.FC<Props> = (props: Props) => {
    const [wasInitialized, setWasInitialized] = React.useState(false);
    const [currentState, setCurrentState] = React.useState(0);
    const [unusedAnimatedValue] = React.useState(new RNAnimated.Value(0));

    const theme = useTheme();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bottomSheetRef = useRef<any>();
    const snapPoints = useMemo(
        () =>
            wasInitialized
                ? [{ y: DEVICE_SIZE.height - props.paddingBottom }, { y: 0 }]
                : [{ y: DEVICE_SIZE.height }, { y: DEVICE_SIZE.height - props.paddingBottom }, { y: 0 }],
        [props.paddingBottom, wasInitialized]
    );

    const [bottomBorder, setBottomBorder] = React.useState(DEVICE_SIZE.height);

    const minimalPosition = React.useMemo(() => DEVICE_SIZE.height - props.paddingBottom - theme.tabBarHeight, [
        props.paddingBottom,
        theme,
    ]);

    const handleSheetChanges = useCallback(
        (event: ISnapEvent) => {
            const index = event.nativeEvent.index;

            if (!wasInitialized) {
                setWasInitialized(true);
            }

            setCurrentState(index);

            if (index === 1 && bottomBorder === DEVICE_SIZE.height) {
                setBottomBorder(DEVICE_SIZE.height - props.paddingBottom);
                return;
            }

            if (index) {
                StatusBar.setHidden(true, 'slide');
            } else {
                StatusBar.setHidden(false, 'slide');
            }
            // We dont need to update it
            // eslint-disable-next-line
        },
        [bottomBorder]
    );

    useEffect(() => {
        const sub = BackHandler.addEventListener('hardwareBackPress', () => {
            if (currentState) {
                bottomSheetRef.current?.snapTo({ index: 0 });
                return true;
            }

            return false;
        });

        return () => sub.remove();
    }, [bottomSheetRef, currentState]);

    const widgetOpacity = props.animatableValue.interpolate({
        inputRange: [minimalPosition - theme.widgetHeight, minimalPosition],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
    });

    const playerOpacity = props.animatableValue.interpolate({
        inputRange: [0, minimalPosition - theme.widgetHeight],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP,
    });

    // renders
    return (
        <SheetWrapper pointerEvents={'box-none'}>
            <Interactable.View
                ref={(ref) => {
                    bottomSheetRef.current = ref;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setPlayerSheetRef(ref as any);
                }}
                onLayout={React.useCallback(() => bottomSheetRef.current?.snapTo({ index: 1 }), [])}
                verticalOnly={true}
                snapPoints={snapPoints}
                animatedNativeDriver={true}
                style={{ backgroundColor: theme.colors.main }}
                boundaries={{ top: 0, bottom: bottomBorder, bounce: 0 }}
                animatedValueY={props.animatableValue}
                animatedValueX={unusedAnimatedValue}
                initialPosition={{ y: bottomBorder }}
                onSnap={handleSheetChanges}
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
            </Interactable.View>
        </SheetWrapper>
    );
};
