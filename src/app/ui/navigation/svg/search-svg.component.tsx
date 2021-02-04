import * as React from 'react';
import { StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { G, Circle, Path, PathProps, CircleProps } from 'react-native-svg';

import { SVGProps } from './svg.types';

const AnimatedPath = (Animated.createAnimatedComponent(Path) as unknown) as React.ComponentClass<
    // eslint-disable-next-line @typescript-eslint/ban-types
    Animated.AnimateProps<{}, PathProps & { style?: StyleProp<{}> }>
>;

const AnimatedCircle = (Animated.createAnimatedComponent(Circle) as unknown) as React.ComponentClass<
    // eslint-disable-next-line @typescript-eslint/ban-types
    Animated.AnimateProps<{}, CircleProps & { style?: StyleProp<{}> }>
>;

Animated.addWhitelistedNativeProps({
    stroke: true,
});

const SearchSVG: React.FC<SVGProps> = ({ color, size }: SVGProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <G
                transform="translate(3 3)"
                strokeWidth={2}
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <AnimatedCircle cx={8} cy={8} r={10} stroke={color} />
                <AnimatedPath d="M28 31l-14.35-14.35" stroke={color} />
            </G>
        </Svg>
    );
};

export default SearchSVG;
