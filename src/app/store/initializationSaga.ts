import { SagaIterator } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { getLocale } from '../locales/selectors';
import { CHANGE_LOCALE } from '../locales/actions';
import { LocalesEnum } from '../locales/locales.state';

export function* initializationSaga(): SagaIterator {
    const currentLocale = yield select(getLocale);

    if (!currentLocale) {
        yield put(CHANGE_LOCALE({ locale: LocalesEnum.EN }));
    }
}
