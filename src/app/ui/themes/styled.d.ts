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
        fontWeight: {
            bold: number;
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
        };
    }
}
