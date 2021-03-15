import { ExpectApi, expectSaga, testSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga-test-plan/matchers';
import {
    addToPlaylist,
    followOrUnfollowSaga,
    listenForAddToPlaylist,
    listenForFollowOrUnfollow,
    listenForLoadAlbumSaga,
    listenForLoadArtistSaga,
    loadAlbumSaga,
    loadArtistSaga,
} from '../../../src/app/music-stack/sagas';
import { ADD_TO_PLAYLIST, FOLLOW_OR_UNFOLLOW, LOAD_ALBUM, LOAD_ARTIST } from '../../../src/app/music-stack/actions';
import { getAlbumsState, getArtist, getArtistsState } from '../../../src/app/music-stack/selectors';
import { Album, Artist, Playlist } from '../../../src/types/music';
import { client } from '../../../src/graphql/api';
import { Logger } from '../../../src/app/utils/logger';
import { getArtistFromMap } from '../../../src/app/utils/get-artists';
import { firebase } from '../../../src/app/utils/firebase';
import { getAlbumsFromMap } from '../../../src/app/utils/get-albums';
import { ADD_PLAYLIST } from '../../../src/app/library/actions';
import { SHOW_FLASHBAR } from '../../../src/app/utils/flashbar/actions';
import { FlashbarEnum } from '../../../src/app/utils/flashbar/flashbar.types';
import { throwError } from 'redux-saga-test-plan/providers';
import { assertWrappingType } from 'graphql';

describe('Music stack sagas', () => {
    describe('Load artist saga', () => {
        let saga: ExpectApi;
        const id = 1;
        const key = '123';
        const artist: Artist = {
            id: id,
            name: '123',
            image: '123',
            popularTracks: [],
            albums: [],
            similarArtists: [],
            isFollowed: false,
        };
        beforeEach(() => {
            saga = expectSaga(loadArtistSaga, LOAD_ARTIST.TRIGGER({ id: id, key: key })).provide([
                [select(getArtist), artist],
                [call.fn(client.getArtist), artist],
                [call.fn(firebase.artistOpened), undefined],
                [call.fn(Logger.error), undefined],
            ]);
        });
        it('should return current artist if in in redux', async () => {
            saga = expectSaga(loadArtistSaga, LOAD_ARTIST.TRIGGER({ id: id, key: key })).provide([
                [select(getArtistsState), undefined],
                [call.fn(getArtistFromMap), artist],
                [call.fn(client.getArtist), undefined],
                [call.fn(firebase.artistOpened), undefined],
                [call.fn(Logger.error), undefined],
            ]);
            return artist;
        });
        it('should dispatch artist load started action', async () => {
            saga = expectSaga(loadArtistSaga, LOAD_ARTIST.TRIGGER({ id: id, key: key })).provide([
                [select(getArtistsState), undefined],
                [call.fn(getArtistFromMap), undefined],
                [call.fn(client.getArtist), artist],
                [call.fn(firebase.artistOpened), undefined],
                [call.fn(Logger.error), undefined],
            ]);
            await saga.put(LOAD_ARTIST.STARTED({ key: key })).run(false);
        });
        it('should dispatch artist load completed action', async () => {
            saga = expectSaga(loadArtistSaga, LOAD_ARTIST.TRIGGER({ id: id, key: key })).provide([
                [select(getArtistsState), undefined],
                [call.fn(getArtistFromMap), undefined],
                [call.fn(client.getArtist), artist],
                [call.fn(firebase.artistOpened), undefined],
                [call.fn(Logger.error), undefined],
            ]);
            await saga.put(LOAD_ARTIST.COMPLETED({ key: key, artist })).run(false);
        });
        it('should log console error', async () => {
            const testError = new Error('error');
            saga = expectSaga(loadArtistSaga, LOAD_ARTIST.TRIGGER({ id: id, key: key })).provide([
                [select(getArtistsState), undefined],
                [call.fn(getArtistFromMap), undefined],
                [call.fn(client.getArtist), throwError(testError)],
                [call.fn(firebase.artistOpened), undefined],
                [call.fn(Logger.error), undefined],
            ]);

            await saga.call(Logger.error, testError).run(false);
        });
    });
    describe('Load album saga', () => {
        let saga: ExpectApi;
        const id = 1;
        const key = '123';
        const album: Album = {} as Album;
        beforeEach(() => {
            saga = expectSaga(loadAlbumSaga, LOAD_ALBUM.TRIGGER({ id: id, key: key })).provide([
                [select(getAlbumsState), undefined],
                [call.fn(getAlbumsFromMap), album],
                [call.fn(firebase.albumOpened), undefined],
                [call.fn(client.getAlbum), album],
                [call.fn(Logger.error), undefined],
            ]);
        });
        it('should return current album if in in redux', async () => {
            saga = expectSaga(loadAlbumSaga, LOAD_ALBUM.TRIGGER({ id: id, key: key })).provide([
                [select(getAlbumsState), undefined],
                [call.fn(getAlbumsFromMap), album],
                [call.fn(firebase.albumOpened), undefined],
                [call.fn(client.getAlbum), undefined],
                [call.fn(Logger.error), undefined],
            ]);

            return album;
        });
        it('should dispatch album load started action', async () => {
            saga = expectSaga(loadAlbumSaga, LOAD_ALBUM.TRIGGER({ id: id, key: key })).provide([
                [select(getAlbumsState), undefined],
                [call.fn(getAlbumsFromMap), undefined],
                [call.fn(firebase.albumOpened), undefined],
                [call.fn(client.getAlbum), album],
                [call.fn(Logger.error), undefined],
            ]);

            await saga.put(LOAD_ALBUM.STARTED({ key: key })).run(false);
        });
        it('should dispatch album completed action', async () => {
            saga = expectSaga(loadAlbumSaga, LOAD_ALBUM.TRIGGER({ id: id, key: key })).provide([
                [select(getAlbumsState), undefined],
                [call.fn(getAlbumsFromMap), undefined],
                [call.fn(firebase.albumOpened), undefined],
                [call.fn(client.getAlbum), album],
                [call.fn(Logger.error), undefined],
            ]);

            await saga.put(LOAD_ALBUM.COMPLETED({ key: key, album })).run(false);
        });
        it('should log console error', async () => {
            const testError = new Error('error');
            saga = expectSaga(loadAlbumSaga, LOAD_ALBUM.TRIGGER({ id: id, key: key })).provide([
                [select(getAlbumsState), undefined],
                [call.fn(getAlbumsFromMap), undefined],
                [call.fn(firebase.albumOpened), undefined],
                [call.fn(client.getAlbum), throwError(testError)],
                [call.fn(Logger.error), undefined],
            ]);

            await saga.call(Logger.error, testError).run(false);
        });
    });
    describe('Add to playlist saga', () => {
        let saga: ExpectApi;
        const trackID = '1';
        const playlistID = 1;
        const playlist: Playlist = {} as Playlist;
        beforeEach(() => {
            saga = expectSaga(
                addToPlaylist,
                ADD_TO_PLAYLIST.TRIGGER({ trackId: trackID, playlistId: playlistID })
            ).provide([
                [call.fn(client.addToPlaylist), playlist],
                [call.fn(Logger.error), undefined],
            ]);
        });
        it('should dispatch add playlist completed action', async () => {
            await saga.put(ADD_PLAYLIST.COMPLETED(playlist)).run(false);
        });
        it('should dispatch show flashbar action', async () => {
            await saga
                .put(SHOW_FLASHBAR({ message: 'Track successfully added', type: FlashbarEnum.Success }))
                .run(false);
        });
    });
    describe('Follow or unfollow saga', () => {
        let saga: ExpectApi;
        const result: number[] = [];
        beforeEach(() => {
            saga = expectSaga(followOrUnfollowSaga, FOLLOW_OR_UNFOLLOW.TRIGGER(1)).provide([
                [call.fn(client.subscribe), result],
                [call.fn(Logger.error), undefined],
            ]);
        });
        it('should dispatch follow or unfollow action', async () => {
            await saga.put(FOLLOW_OR_UNFOLLOW.COMPLETED(result)).run(false);
        });
        it('should log console error', async () => {
            const testError = new Error('error');
            saga = expectSaga(followOrUnfollowSaga, FOLLOW_OR_UNFOLLOW.TRIGGER(1)).provide([
                [call.fn(client.subscribe), throwError(testError)],
                [call.fn(Logger.error), undefined],
            ]);

            await saga.call(Logger.error, testError).run(false);
        });
    });
    describe('listenForLoadArtistSaga', () => {
        it('should listen for trigger and run loadArtistSaga', function () {
            testSaga(listenForLoadArtistSaga).next().takeLatest(LOAD_ARTIST.TRIGGER, loadArtistSaga);
        });
    });
    describe('listenForLoadAlbumSaga', () => {
        it('should listen for trigger and run loadAlbumSaga', function () {
            testSaga(listenForLoadAlbumSaga).next().takeLatest(LOAD_ALBUM.TRIGGER, loadAlbumSaga);
        });
    });
    describe('listenForAddToPlaylistSaga', () => {
        it('should listen for trigger and run addToPlaylistSaga', function () {
            testSaga(listenForAddToPlaylist).next().takeLatest(ADD_TO_PLAYLIST.TRIGGER, addToPlaylist);
        });
    });
    describe('listenForFollowOrUnfollowSaga', () => {
        it('should listen for trigger and run followOrUnfollowSaga', function () {
            testSaga(listenForFollowOrUnfollow).next().takeLatest(FOLLOW_OR_UNFOLLOW.TRIGGER, followOrUnfollowSaga);
        });
    });
});
