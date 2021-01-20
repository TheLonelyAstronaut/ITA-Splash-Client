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

const localesCollection: Partial<Record<LocalesEnum, DefaultLocale>> = {
    [LocalesEnum.EN]: en,
    [LocalesEnum.RU]: ru,
};

export { en, ru, localesCollection };
