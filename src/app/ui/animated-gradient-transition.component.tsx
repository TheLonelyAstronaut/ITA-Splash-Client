import _ from 'lodash';
import React, { Component } from 'react';
import { Animated, Easing, EasingFunction } from 'react-native';
import NativeLinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

type AnimatedInterpolation = Animated.AnimatedInterpolation;

type AnimationProps = {
    toValue: number;
    duration: number;
    easing: EasingFunction;
};

type AnimatedGradientTransitionProps = LinearGradientProps & {
    animation: AnimationProps;
};

type AnimatedGradientTransitionState = {
    colors: (string | number)[];
    prevColors: (string | number)[];
    animatedColors: Animated.Value[];
};

class LinearGradient extends React.Component<LinearGradientProps> {
    // Generate back the colors array with all transformed props
    _generateColorsArray(props: LinearGradientProps) {
        const propsKeys = Object.keys(props);
        const colorsArray: (keyof LinearGradientProps)[] = [];

        propsKeys.forEach((key) => {
            if (key.indexOf('animatedColor') !== -1 && props[key] && typeof props[key] === 'string') {
                colorsArray.push(props[key]);
            }
        });

        return colorsArray;
    }

    render() {
        const { children, ...props } = this.props;
        const colorsArray = this._generateColorsArray(props);
        const nativeLinearProps = _.omit(props, Object.keys(colorsArray));

        return (
            <NativeLinearGradient {...nativeLinearProps} colors={colorsArray}>
                {children}
            </NativeLinearGradient>
        );
    }
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

class AnimatedGradientTransition extends Component<AnimatedGradientTransitionProps, AnimatedGradientTransitionState> {
    static defaultProps = {
        animation: {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
        },
    };

    constructor(props: AnimatedGradientTransitionProps) {
        super(props);

        this.state = {
            colors: props.colors,
            prevColors: props.colors,
            animatedColors: props.colors.map(() => new Animated.Value(0)),
        };
    }

    static getDerivedStateFromProps(
        nextProps: AnimatedGradientTransitionProps,
        prevState: AnimatedGradientTransitionState
    ): AnimatedGradientTransitionState | null {
        const keys = ['colors'];
        const mutableProps = _.pick(nextProps, keys);
        const stateToCompare = _.pick(prevState, keys);
        let animatedColors = prevState.animatedColors;

        animatedColors = AnimatedGradientTransition.animateGradientTransition(
            animatedColors,
            mutableProps.colors,
            prevState.colors,
            nextProps.animation
        );

        if (!_.isEqual(mutableProps, stateToCompare)) {
            return {
                ...mutableProps,
                animatedColors,
                prevColors: prevState.colors,
            };
        }

        return null;
    }

    static animateGradientTransition(
        animatedColors: Animated.Value[],
        curColors: (string | number)[],
        prevColors: (string | number)[],
        animation: AnimationProps
    ): Animated.Value[] {
        // Animate only if the new colors are different
        if (!_.isEqual(prevColors, curColors)) {
            // Update number of animatedValue if the length is different
            if (animatedColors.length !== curColors.length) {
                animatedColors = curColors.map(() => new Animated.Value(0));
            } else {
                animatedColors.forEach((animatedColor) => animatedColor.setValue(0));
            }

            // Parallel animation of all background colors
            Animated.parallel(
                animatedColors.map((animatedColor) => {
                    return Animated.timing(animatedColor, {
                        toValue: animation.toValue,
                        duration: animation.duration,
                        easing: animation.easing,
                        useNativeDriver: false,
                    });
                })
            ).start();
        }

        return animatedColors;
    }

    _getColorSafely(colors: (string | number)[], index: number): string | number {
        if (colors[index]) {
            return colors[index];
        }

        return colors.slice(-1)[0];
    }

    _getInterpolatedColors(): AnimatedInterpolation[] {
        const { colors, prevColors, animatedColors } = this.state;

        return animatedColors.map((animatedColor, index) => {
            return animatedColor.interpolate({
                inputRange: [0, 1],
                outputRange: [
                    this._getColorSafely(prevColors, index) as string,
                    this._getColorSafely(colors, index) as string,
                ],
            });
        });
    }

    // Send all colors as props to enable Animated api to transform it
    _generateColorsProps(interpolatedColors: AnimatedInterpolation[]): Record<string, AnimatedInterpolation> {
        let props: Record<string, AnimatedInterpolation> = {};

        interpolatedColors.forEach((interpolateColor, index) => {
            const key = `animatedColor${index}`;

            props = _.merge(props, {
                [key]: interpolateColor,
            });

            return {
                [key]: interpolateColor,
            };
        });

        return props;
    }

    render(): React.ReactNode {
        const { children, ...props } = this.props;
        const interpolatedColors = this._getInterpolatedColors();
        const animatedColorsProps = this._generateColorsProps(interpolatedColors);

        return (
            <AnimatedLinearGradient {...props} {...animatedColorsProps}>
                {children}
            </AnimatedLinearGradient>
        );
    }
}

export default AnimatedGradientTransition;
