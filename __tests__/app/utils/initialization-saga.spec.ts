jest.mock('react-native-track-player');
import * as MockTrackPlayer from '../../../__mocks__/react-native-track-player';
import { expectSaga, testSaga, ExpectApi } from 'redux-saga-test-plan';
import { call, select, put } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { LOGIN, LOGOUT } from '../../../src/app/authentication/actions';
import { getAccessToken } from '../../../src/app/authentication/selectors';
import { MUSIC_ACTIONS } from '../../../src/app/player/actions';
import { INITIALIZATION, initializationSaga } from '../../../src/app/utils/initialization-saga';
import RNTrackPlayer, { Event } from 'react-native-track-player';
import { tracks } from '../../../src/mocks/tracks';

describe('Initialization Saga', () => {
    let saga: ExpectApi;
    const mockDispatch = jest.fn();

    const currentTrack = tracks[0];

    beforeEach(() => {
        ((RNTrackPlayer as unknown) as jest.Mock).mockImplementation(() => ({
            Capability: {
                Play: 0,
                PlayFromId: 1,
                PlayFromSearch: 2,
                Pause: 3,
                Stop: 4,
                SeekTo: 5,
                Skip: 6,
                SkipToNext: 7,
                SkipToPrevious: 8,
                JumpForward: 9,
                JumpBackward: 10,
                SetRating: 11,
                Like: 12,
                Dislike: 13,
                Bookmark: 14,
            },
        }));
        saga = expectSaga(initializationSaga, INITIALIZATION(mockDispatch)).provide([
            [call.fn(RNTrackPlayer.setupPlayer), undefined],
            [
                call.fn(RNTrackPlayer.updateOptions),
                {
                    stopWithApp: true,
                    capabilities: undefined,
                    compactCapabilities: undefined,
                    notificationCapabilities: undefined,
                },
            ][
                // eslint-disable-next-line no-unexpected-multiline
                (call.fn(RNTrackPlayer.addEventListener), Event.PlaybackTrackChanged)
            ],
        ]);
    });
    it('should set current track', async () => {
        await saga.put(MUSIC_ACTIONS.SET_CURRENT_TRACK(currentTrack)).run(false);
    });
});
