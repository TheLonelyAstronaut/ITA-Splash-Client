import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        fontSize: {
            extraLarge: number;
            large: number;
            medium: number;
            small: number;
            extraSmall: number;
        };
        spacer: number;
        sliderHeight: number;
        separator: {
            borderWidth: number;
            borderColor: string;
        };
        tabBarHeight: number;
        widgetHeight: number;
        fontFamily: {
            regular?: string;
            medium?: string;
            bold?: string;
            extraBold?: string;
            black?: string;
        };
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
        widget: {
            iconSize: number;
            progressHeight: number;
        };
    }
}
