import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';
import { ADD_PLAYLIST, LOAD_LIBRARY } from '../library/actions';
import { firebase } from '../utils/firebase';
import { SHOW_FLASHBAR } from '../utils/flashbar/actions';
import { FlashbarEnum } from '../utils/flashbar/flashbar.types';
import I18n from '../utils/i18n';
import { Logger } from '../utils/logger';

import { ADD_TO_PLAYLIST, FOLLOW_OR_UNFOLLOW, LOAD_ALBUM, LOAD_ARTIST } from './actions';
import { getAlbum, getAlbumsState, getArtistsState } from './selectors';
import { getArtistFromMap } from '../utils/get-artists';
import { getAlbumsFromMap } from '../utils/get-albums';

export class ExtendedError extends Error {
    constructor(error: Error, public readonly key: string) {
        super(error.message);
    }
}

export function* loadArtistSaga(action: ReturnType<typeof LOAD_ARTIST.TRIGGER>): SagaIterator {
    try {
        const artists = yield select(getArtistsState);
        let artist = yield call(getArtistFromMap, artists, action.payload.id);
        yield call(firebase.artistOpened, artist);

        if (!artist) {
            yield put(LOAD_ARTIST.STARTED({ key: action.payload.key }));
            artist = yield call(client.getArtist, action.payload.id);
            yield put(LOAD_ARTIST.COMPLETED({ key: action.payload.key, artist }));
        }
    } catch (error) {
        yield call(Logger.error, error);
        yield put(LOAD_ARTIST.COMPLETED.failed(new ExtendedError(error, action.payload.key)));
    }
}

export function* loadAlbumSaga(action: ReturnType<typeof LOAD_ALBUM.TRIGGER>): SagaIterator {
    try {
        const albums = yield select(getAlbumsState);
        let album = yield call(getAlbumsFromMap, albums, action.payload.id);
        yield call(firebase.albumOpened, album);

        if (!album) {
            yield put(LOAD_ALBUM.STARTED({ key: action.payload.key }));
            album = yield call(client.getAlbum, action.payload.id);
            yield put(LOAD_ALBUM.COMPLETED({ key: action.payload.key, album }));
        }
    } catch (error) {
        yield call(Logger.error, error);
        yield put(LOAD_ALBUM.COMPLETED.failed(new ExtendedError(error, action.payload.key)));
    }
}

export function* addToPlaylist(action: ReturnType<typeof ADD_TO_PLAYLIST.TRIGGER>): SagaIterator {
    try {
        const result = yield call(client.addToPlaylist, action.payload.trackId, action.payload.playlistId);
        yield put(ADD_PLAYLIST.COMPLETED(result));
        yield put(SHOW_FLASHBAR({ type: FlashbarEnum.Success, message: I18n.t('flashbar.successfullyAdded') }));
    } catch (error) {
        yield call(Logger.error, error);
    }
}

export function* followOrUnfollowSaga(action: ReturnType<typeof FOLLOW_OR_UNFOLLOW.TRIGGER>): SagaIterator {
    try {
        const result = yield call(client.subscribe, action.payload);
        yield put(FOLLOW_OR_UNFOLLOW.COMPLETED(result));
    } catch (error) {
        yield call(Logger.error, error);
        yield put(SHOW_FLASHBAR({ type: FlashbarEnum.Danger, message: I18n.t('flashbar.errorHappened') }));
    }
}

export function* listenForFollowOrUnfollow(): SagaIterator {
    yield takeLatest(FOLLOW_OR_UNFOLLOW.TRIGGER, followOrUnfollowSaga);
}

export function* listenForAddToPlaylist(): SagaIterator {
    yield takeLatest(ADD_TO_PLAYLIST.TRIGGER, addToPlaylist);
}

export function* listenForLoadArtistSaga(): SagaIterator {
    yield takeLatest(LOAD_ARTIST.TRIGGER, loadArtistSaga);
}

export function* listenForLoadAlbumSaga(): SagaIterator {
    yield takeLatest(LOAD_ALBUM.TRIGGER, loadAlbumSaga);
}
