import { DefaultTheme } from 'styled-components/native';

export enum ThemesEnum {
    LIGHT,
    DARK,
}

export interface ThemeState {
    theme: ThemesEnum;
}
