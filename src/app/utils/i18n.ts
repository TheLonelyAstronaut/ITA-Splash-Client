import * as RNLocalize from 'react-native-localize';
import { LocalesEnum } from '../locales/locales.state';

const localeTags = {
    en: LocalesEnum.EN,
    ru: LocalesEnum.RU,
};

export const getCurrentLocaleEnum = () => {
    const locales = RNLocalize.getLocales();
    if (Array.isArray(locales)) {
        if (localeTags[locales[0].languageTag]) {
            return localeTags[locales[0].languageTag];
        } else {
            return LocalesEnum.EN;
        }
    }
};
