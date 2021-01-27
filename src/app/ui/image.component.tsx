import React from 'react';
import FastImage, { ImageStyle } from 'react-native-fast-image';

export type CustomImageProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    source: any;
    style: ImageStyle;
    blurred?: boolean;
};

export const Image: React.FC<CustomImageProps> = (props: CustomImageProps) => (
    <FastImage style={props.style} source={props.source} resizeMode={FastImage.resizeMode.cover} />
);
