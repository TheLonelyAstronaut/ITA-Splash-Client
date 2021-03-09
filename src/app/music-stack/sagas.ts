import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';
import { LOAD_LIBRARY } from '../library/actions';
import { SHOW_FLASHBAR } from '../utils/flashbar/actions';
import { FlashbarEnum } from '../utils/flashbar/flashbar.types';

import { ADD_TO_PLAYLIST, FOLLOW_OR_UNFOLLOW, LOAD_ALBUM, LOAD_ARTIST } from './actions';
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

export function* addToPlaylist(action: ReturnType<typeof ADD_TO_PLAYLIST.TRIGGER>): SagaIterator {
    try {
        yield call(client.addToPlaylist, action.payload.trackId, action.payload.playlistId);
        yield put(LOAD_LIBRARY.TRIGGER());
        yield put(SHOW_FLASHBAR({ type: FlashbarEnum.Success, message: 'Track successfully added' }));
    } catch (e) {
        yield put(SHOW_FLASHBAR({ type: FlashbarEnum.Danger, message: 'Track already in playlist' }));
    }
}

export function* followOrUnfollowSaga(action: ReturnType<typeof FOLLOW_OR_UNFOLLOW>): SagaIterator {
    const artist = yield select(getArtist(action.payload));
    const newArtist = { ...artist, isFollowed: !artist.isFollowed };
    yield put(LOAD_ARTIST.COMPLETED({ key: '', artist: newArtist }));
    yield call(client.followOrUnfollow, action.payload);
}

export function* listenForFollowOrUnfollow(): SagaIterator {
    yield takeLatest(FOLLOW_OR_UNFOLLOW, followOrUnfollowSaga);
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
