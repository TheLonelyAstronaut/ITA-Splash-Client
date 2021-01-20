import { DefaultLocale } from './default-locale';
import { LocalesEnum } from './locales.state';

const en: DefaultLocale = {
    hello: 'hello',
    login: 'login',
};

const ru: DefaultLocale = {
    hello: 'привет',
    login: 'логин',
};

const themesCollection: Partial<Record<LocalesEnum, DefaultLocale>> = {
    [LocalesEnum.en]: en,
    [LocalesEnum.ru]: ru,
};

export { en, ru, themesCollection };