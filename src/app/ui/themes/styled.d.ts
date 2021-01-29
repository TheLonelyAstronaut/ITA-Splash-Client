import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        fontSize: {
            large: number;
            medium: number;
            small: number;
            extraSmall: number;
        };
        spacer: number;
        tabBarHeight: number;
        widgetHeight: number;
        fontWeight: {
            bold: number;
            standard: number;
            normal: number;
            thin: number;
        };
        borderRadius: {
            large: number;
            medium: number;
            small: number;
        };
        colors: {
            main: string;
            secondary: string;
            additive: string;
            screenBackground: string;
            sliderColor: string;
        };
        player: {
            artworkSize: number;
            artworkMarginTop: number;
            headerHeight: number;
            marginHorizontal: number;
            marginVertical: number;
            controlPlayPauseSize: number;
            controlPrevNextSize: number;
        };
    }
}
