import RNTrackPlayer, { Event } from 'react-native-track-player';
import { expectSaga, ExpectApi } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga-test-plan/matchers';

import { users } from '../../../__mocks__/data/users';
import { LOGIN } from '../../../src/app/authentication/actions';
import { User } from '../../../src/app/authentication/authentication.types';
import { getAccessToken } from '../../../src/app/authentication/selectors';
import { INITIALIZATION, initializationSaga } from '../../../src/app/utils/initialization-saga';
import { client } from '../../../src/graphql/api';

jest.mock('react-native-track-player', () => ({
    Capability: {
        Play: 0,
        Pause: 3,
        SkipToNext: 7,
        SkipToPrevious: 8,
    },
    Event: {
        PlaybackTrackChanged: 'playback-track-changed',
    },
    setupPlayer: jest.fn(),
    updateOptions: jest.fn(),
    addEventListener: jest.fn(),
}));

describe('Initialization Saga', () => {
    let saga: ExpectApi;
    const mockDispatch = jest.fn();
    const mockUser: User = users[0];
    // const currentTrack = tracks[0];
    const token = 'test_token';

    beforeEach(() => {
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
            ],
            [call.fn(RNTrackPlayer.addEventListener), Event.PlaybackTrackChanged],
            [select(getAccessToken), token],
            [call.fn(client.setAuthToken), undefined],
            [call.fn(client.getCurrentUser), mockUser],
        ]);
    });

    it('should update user object if token is valid', async () => {
        await saga.put(LOGIN.COMPLETED({ data: mockUser, token })).run(false);
    });
});
