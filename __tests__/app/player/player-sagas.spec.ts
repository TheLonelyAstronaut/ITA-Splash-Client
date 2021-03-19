import RNTrackPlayer from 'react-native-track-player';
import { expectSaga, ExpectApi } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';

import { tracks } from '../../../__mocks__/data/tracks';
import { MUSIC_ACTIONS } from '../../../src/app/player/actions';
import { addToQueueSaga, seekTo } from '../../../src/app/player/sagas';

jest.mock('react-native-track-player', () => ({
    stop: jest.fn(),
    reset: jest.fn(),
    getQueue: jest.fn(),
    add: jest.fn(),
    getCurrentTrack: jest.fn(),
    seekTo: jest.fn(),
    skip: jest.fn(),
    play: jest.fn(),
}));

describe('Player sagas', () => {
    describe('Add to queue saga', () => {
        let saga: ExpectApi;
        const currentTrack = tracks[0];
        const testTrack = {
            id: '5',
            url: '123',
            title: '123',
            artist: '123',
            artwork: '123',
            liked: false,
            artistID: 5,
            albumID: 5,
        };
        const nextTrackID = (parseInt(currentTrack.id) + 1).toString();

        beforeEach(() => {
            saga = expectSaga(addToQueueSaga, MUSIC_ACTIONS.ADD_TO_THE_QUEUE.TRIGGER(testTrack)).provide([
                [call.fn(RNTrackPlayer.getQueue), tracks],
                [call.fn(RNTrackPlayer.getCurrentTrack), currentTrack],
                [call.fn(RNTrackPlayer.add), testTrack],
            ]);
        });

        it('should dispatch add to the queue completed action', async () => {
            await saga
                .put(MUSIC_ACTIONS.ADD_TO_THE_QUEUE.COMPLETED({ insertBeforeTrack: nextTrackID, track: testTrack }))
                .run(false);
        });
    });
    describe('seek to saga', () => {
        let saga: ExpectApi;

        beforeEach(() => {
            saga = expectSaga(seekTo, MUSIC_ACTIONS.SEEK_TO_POSITION({ position: 1 })).provide([
                [call.fn(RNTrackPlayer.seekTo), 1],
            ]);
        });
        it('should seek to position', async () => {
            await saga.call(RNTrackPlayer.seekTo, 1).run(false);
        });
    });
});
