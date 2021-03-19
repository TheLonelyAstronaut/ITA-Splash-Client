import React from 'react';
import { Animated, Easing } from 'react-native';
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';

import { GestureHandlerWrapper, PlayedStateWrapper, SliderWrapper } from './styled/animated-slider.styled';

export type SizeProp = {
    height: number;
    width: number;
};

export type ResetCallback = () => void;

export type TrackSliderProps = SizeProp & {
    onGestureEnd: (time: number) => void;
    duration: number;
    disableTouches?: boolean;
    paused?: boolean;
    currentPosition: number;
};

export type TrackSliderState = {
    progressPointer: Animated.CompositeAnimation | null;
    durationLeft: number;
};

export class TrackSlider extends React.Component<TrackSliderProps, TrackSliderState> {
    private panValue = new Animated.Value(0);

    private translateX = this.panValue.interpolate({
        inputRange: [0, this.props.width],
        outputRange: [0, this.props.width],
        extrapolate: 'clamp',
    });

    private onPanGestureEvent = Animated.event([{ nativeEvent: { x: this.panValue } }], { useNativeDriver: false });

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

    public animateToValue = (duration: number, toStart?: boolean): void => {
        this.state.progressPointer?.stop();

        if (duration === this.props.duration || toStart) {
            this.panValue.setValue(0);

            if (toStart) {
                return;
            }
        }

        const progress: Animated.CompositeAnimation = Animated.timing(this.panValue, {
            toValue: this.props.width,
            duration: duration * 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        });

        this.setState({ progressPointer: progress }, () => {
            progress.start();
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
