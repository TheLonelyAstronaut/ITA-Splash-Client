import { ExpectApi, expectSaga } from 'redux-saga-test-plan';
import { spawn } from 'redux-saga-test-plan/matchers';

import { listenForLoginSaga, listenForLogoutSaga, listenForRegisterSaga } from '../../../src/app/authentication/sagas';
import { listenForChangePasswordSaga, listenForLoadHomepage } from '../../../src/app/home/sagas';
import { listenForAddPlaylistSaga } from '../../../src/app/library/sagas';
import {
    listenForAddToPlaylist,
    listenForFollowOrUnfollow,
    listenForLoadAlbumSaga,
    listenForLoadArtistSaga,
} from '../../../src/app/music-stack/sagas';
import { listenPlaySaga, listenControlSaga, listenAddToQueueSaga, listenSeekTo } from '../../../src/app/player/sagas';
import { listenForSearchSaga } from '../../../src/app/search/sagas';
import { rootSaga } from '../../../src/app/store/root-saga';
import { listenFlashbarSaga } from '../../../src/app/utils/flashbar/sagas';
import { listenForInitializationSaga } from '../../../src/app/utils/initialization-saga';

describe('rootSaga', () => {
    let saga: ExpectApi;

    beforeEach(() => {
        saga = expectSaga(rootSaga).provide([
            [spawn.fn(listenForLoginSaga), undefined],
            [spawn.fn(listenForLogoutSaga), undefined],
            [spawn.fn(listenForRegisterSaga), undefined],
            [spawn.fn(listenForChangePasswordSaga), undefined],
            [spawn.fn(listenForLoadHomepage), undefined],
            [spawn.fn(listenForAddPlaylistSaga), undefined],
            [spawn.fn(listenForAddToPlaylist), undefined],
            [spawn.fn(listenForFollowOrUnfollow), undefined],
            [spawn.fn(listenForLoadAlbumSaga), undefined],
            [spawn.fn(listenForLoadArtistSaga), undefined],
            [spawn.fn(listenPlaySaga), undefined],
            [spawn.fn(listenControlSaga), undefined],
            [spawn.fn(listenAddToQueueSaga), undefined],
            [spawn.fn(listenFlashbarSaga), undefined],
            [spawn.fn(listenForSearchSaga), undefined],
            [spawn.fn(listenForInitializationSaga), undefined],
            [spawn.fn(listenSeekTo), undefined],
        ]);
    });
    it('should spawn for listenForLoginSaga', async () => {
        await saga.spawn(listenForLoginSaga).run(false);
    });
    it('should spawn for listenForLogoutSaga', async () => {
        await saga.spawn(listenForLogoutSaga).run(false);
    });
    it('should spawn for listenForRegisterSaga', async () => {
        await saga.spawn(listenForRegisterSaga).run(false);
    });
    it('should spawn for listenForChangePasswordSaga', async () => {
        await saga.spawn(listenForChangePasswordSaga).run(false);
    });
    it('should spawn for listenForLoadHomepage', async () => {
        await saga.spawn(listenForLoadHomepage).run(false);
    });
    it('should spawn for listenForAddPlaylistSaga', async () => {
        await saga.spawn(listenForAddPlaylistSaga).run(false);
    });
    it('should spawn for listenForAddToPlaylist', async () => {
        await saga.spawn(listenForAddToPlaylist).run(false);
    });
    it('should spawn for listenForLoadAlbumSaga', async () => {
        await saga.spawn(listenForLoadAlbumSaga).run(false);
    });
    it('should spawn for listenForFollowOrUnfollow', async () => {
        await saga.spawn(listenForFollowOrUnfollow).run(false);
    });
    it('should spawn for listenForLoadArtistSaga', async () => {
        await saga.spawn(listenForLoadArtistSaga).run(false);
    });
    it('should spawn for listenPlaySaga', async () => {
        await saga.spawn(listenPlaySaga).run(false);
    });
    it('should spawn for listenControlSaga', async () => {
        await saga.spawn(listenControlSaga).run(false);
    });
    it('should spawn for listenAddToQueueSaga', async () => {
        await saga.spawn(listenAddToQueueSaga).run(false);
    });
    it('should spawn for listenFlashbarSaga', async () => {
        await saga.spawn(listenFlashbarSaga).run(false);
    });
    it('should spawn for listenForSearchSaga', async () => {
        await saga.spawn(listenForSearchSaga).run(false);
    });
    it('should spawn for listenForInitializationSaga', async () => {
        await saga.spawn(listenForInitializationSaga).run(false);
    });
    it('should spawn for listenSeekTo', async () => {
        await saga.spawn(listenSeekTo).run(false);
    });
});
