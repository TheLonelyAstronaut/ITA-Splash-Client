import React from 'react';
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';
import Animated, { Extrapolate, Easing, call } from 'react-native-reanimated';
import styled from 'styled-components/native';

export type SizeProp = {
    height: number;
    width: number;
};

export const SliderWrapper = styled(Animated.View)<SizeProp>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: ${(props) => props.theme.colors.sliderColor};
    border-radius: ${(props) => (props.height > 5 ? props.height / 2 : 0)}px;
    overflow: visible;
    justify-content: center;
`;

export const PlayedStateWrapper = styled(SliderWrapper)<SizeProp>`
    width: 0px;
    height: ${(props) => props.height}px;
    background-color: ${(props) => props.theme.colors.secondary};
`;

export const GestureHandlerWrapper = styled(Animated.View)<SizeProp>`
    width: ${(props) => props.height * 2}px;
    height: ${(props) => props.height * 2}px;
    border-radius: ${(props) => props.height}px;
    background-color: ${(props) => props.theme.colors.secondary};
    margin-left: ${(props) => props.height / -2}px;
    position: absolute;
`;

export type ResetCallback = () => void;

export type TrackSliderProps = SizeProp & {
    onGestureEnd: (time: number) => void;
    duration: number;
    disableTouches?: boolean;
    paused?: boolean;
    currentPosition: number;
};

export type TrackSliderState = {
    progressPointer: Animated.BackwardCompatibleWrapper | null;
    durationLeft: number;
};

export class TrackSlider extends React.Component<TrackSliderProps, TrackSliderState> {
    private panValue = new Animated.Value(0);
    private translateX = this.panValue.interpolate({
        inputRange: [0, this.props.width],
        outputRange: [0, this.props.width],
        extrapolate: Extrapolate.CLAMP,
    });
    private onPanGestureEvent = Animated.event([{ nativeEvent: { x: this.panValue } }]);
    private currentAnimatedValue = 0;

    constructor(props: TrackSliderProps) {
        super(props);

        this.state = {
            durationLeft: 0,
            progressPointer: null,
        };
    }

    componentDidUpdate(prevProps: Readonly<TrackSliderProps>): void {
        if (prevProps.duration != this.props.duration) {
            this.animateToValue(this.props.duration);
        }

        if (prevProps.paused != this.props.paused) {
            if (this.props.paused) {
                this.setState({ durationLeft: this.props.duration - this.props.currentPosition });
                this.state.progressPointer?.stop();
            } else {
                this.animateToValue(this.state.durationLeft);
                this.setState({ durationLeft: 0 });
            }
        }
    }

    public animateToValue = (duration: number): void => {
        this.state.progressPointer?.stop();

        if (duration === this.props.duration) {
            this.panValue.setValue(0);
        }

        const progress: Animated.BackwardCompatibleWrapper = Animated.timing(this.panValue, {
            toValue: this.props.width,
            duration: duration * 1000,
            easing: Easing.linear,
        });

        this.setState({ progressPointer: progress }, () => {
            this.state.progressPointer?.start();
        });
    };

    handleStateChange = (event: PanGestureHandlerStateChangeEvent): void => {
        this.state.progressPointer?.stop();

        if (event.nativeEvent.state === State.END) {
            const calculatedPosition =
                event.nativeEvent.x < 0
                    ? 0
                    : event.nativeEvent.x > this.props.width
                    ? this.props.width
                    : event.nativeEvent.x;

            const time = parseInt(((calculatedPosition / this.props.width) * this.props.duration).toFixed(0));

            if (!this.props.paused) {
                this.animateToValue(this.props.duration - time);
            } else {
                this.setState({ durationLeft: this.props.duration - time });
            }

            this.props.onGestureEnd(time);
        }
    };

    render(): React.ReactNode {
        return (
            <PanGestureHandler
                onGestureEvent={!this.props.disableTouches ? this.onPanGestureEvent : undefined}
                onHandlerStateChange={!this.props.disableTouches ? this.handleStateChange : undefined}
                minDeltaX={0}
            >
                <SliderWrapper height={this.props.height} width={this.props.width}>
                    <Animated.Code>
                        {() => call([this.panValue], (panValue) => (this.currentAnimatedValue = panValue[0]))}
                    </Animated.Code>
                    <PlayedStateWrapper
                        style={{
                            width: this.translateX,
                        }}
                        height={this.props.height}
                        width={0}
                    />
                    {!this.props.disableTouches && (
                        <GestureHandlerWrapper
                            style={{
                                transform: [{ translateX: this.translateX }],
                            }}
                            height={this.props.height}
                            width={this.props.width}
                        />
                    )}
                </SliderWrapper>
            </PanGestureHandler>
        );
    }
}
