import '../../../__mocks__/@react-native-firebase/crashlytics';
import { expectSaga, testSaga, ExpectApi } from 'redux-saga-test-plan';
import { call, select, put } from 'redux-saga-test-plan/matchers';
import { addPlaylistSaga, listenForAddPlaylistSaga } from '../../../src/app/library/sagas';
import { ADD_PLAYLIST } from '../../../src/app/library/actions';
import { client } from '../../../src/graphql/api';
import { Playlist } from '../../../src/types/music';
import { Logger } from '../../../src/app/utils/logger';
import { throwError } from 'redux-saga-test-plan/providers';
import { listenForAddToPlaylist } from '../../../src/app/music-stack/sagas';

describe('Library sagas', () => {
    describe('addPlaylistSaga', () => {
        let saga: ExpectApi;
        const name = '123';
        const playlist = {} as Playlist;

        beforeEach(() => {
            saga = expectSaga(addPlaylistSaga, ADD_PLAYLIST.TRIGGER({ name: name })).provide([
                [call.fn(client.addPlaylist), playlist],
                [call.fn(Logger.error), undefined],
            ]);
        });
        it('should dispatch a add playlist completed action', async () => {
            await saga.put(ADD_PLAYLIST.COMPLETED(playlist)).run(false);
        });
        it('should log the error', async () => {
            const testError = new Error('error');
            saga = expectSaga(addPlaylistSaga, ADD_PLAYLIST.TRIGGER({ name: name })).provide([
                [call.fn(client.addPlaylist), throwError(testError)],
                [call.fn(Logger.error), undefined],
            ]);

            await saga.call(Logger.error, testError).run(false);
        });
    });
    describe('listenForAddPlaylistSaga', () => {
        it('should listen for add playlist saga', () => {
            testSaga(listenForAddPlaylistSaga).next().takeLatest(ADD_PLAYLIST.TRIGGER, addPlaylistSaga);
        });
    });
});
