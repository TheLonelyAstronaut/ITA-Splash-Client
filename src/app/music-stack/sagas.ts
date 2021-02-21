import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';

import { client } from '../../graphql/api';

import { LOAD_ALBUM, LOAD_ARTIST } from './actions';
import { getAlbum, getArtist } from './selectors';

export class ExtendedError extends Error {
    constructor(error: Error, public readonly key: string) {
        super(error.message);
    }
}

export function* loadArtistSaga(action: ReturnType<typeof LOAD_ARTIST.TRIGGER>): SagaIterator {
    try {
        let artist = yield select(getArtist(action.payload.id));

        if (!artist) {
            yield put(LOAD_ARTIST.STARTED({ key: action.payload.key }));
            artist = yield call(client.getArtist, action.payload.id);
            yield put(LOAD_ARTIST.COMPLETED({ key: action.payload.key, artist }));
        }
    } catch (err) {
        yield put(LOAD_ARTIST.COMPLETED.failed(new ExtendedError(err, action.payload.key)));
    }
}

export function* loadAlbumSaga(action: ReturnType<typeof LOAD_ALBUM.TRIGGER>): SagaIterator {
    try {
        let album = yield select(getAlbum(action.payload.id));

        if (!album) {
            yield put(LOAD_ALBUM.STARTED({ key: action.payload.key }));
            album = yield call(client.getAlbum, action.payload.id);
            yield put(LOAD_ALBUM.COMPLETED({ key: action.payload.key, album }));
        }
    } catch (err) {
        yield put(LOAD_ALBUM.COMPLETED.failed(new ExtendedError(err, action.payload.key)));
    }
}

export function* listenForLoadArtistSaga(): SagaIterator {
    yield takeLatest(LOAD_ARTIST.TRIGGER, loadArtistSaga);
}

export function* listenForLoadAlbumSaga(): SagaIterator {
    yield takeLatest(LOAD_ALBUM.TRIGGER, loadAlbumSaga);
}
