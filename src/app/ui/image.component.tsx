import React from 'react';
import FastImage, { ImageStyle } from 'react-native-fast-image';

export type CustomImageProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    source: any;
    style?: ImageStyle;
    blurred?: boolean;
    onLoadEnd?: () => void;
};

export class Image extends React.Component<CustomImageProps> {
    render() {
        return (
            <FastImage
                style={this.props.style}
                source={this.props.source}
                onLoadEnd={this.props.onLoadEnd}
                resizeMode={FastImage.resizeMode.cover}
            />
        );
    }
}
