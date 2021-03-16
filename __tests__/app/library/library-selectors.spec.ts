import { ApplicationState } from '../../../src/app/store/application-state.types';
import {
    getErrorLibrary,
    getIsFetchingLibrary,
    getIsSubscribed,
    getLibrary,
    getLikedPlaylist,
    getPlaylist,
    getRootLibraryState,
} from '../../../src/app/library/selectors';
import { playlist } from '../../../__mocks__/data/playlists';
import { LibraryParams } from '../../../src/app/library/reducers';
import { AuthenticationState } from '../../../src/app/authentication/authentication.types';

describe('Library selectors', () => {
    const state: ApplicationState = {
        library: {
            isFetching: false,
            error: undefined,
            data: playlist,
        } as LibraryParams,
        authentication: {
            isFetching: false,
            error: undefined,
            token: '123',
            data: {
                email: '123',
                username: '123',
                playlists: playlist,
                id: 1,
                subscriptions: [],
            },
        } as AuthenticationState,
    } as ApplicationState;

    describe('getRootLibraryState', () => {
        it('should return library state', () => {
            const library = getRootLibraryState(state);

            expect(library).toBe(state.library);
        });
    });
    describe('getLibrary', () => {
        it('should return library playlists', () => {
            const library = getLibrary(state);

            expect(library).toBe(state.authentication.data.playlists);
        });
    });
    describe('getIsFetchingLibrary', () => {
        it('should return library is fetching', () => {
            const library = getIsFetchingLibrary(state);

            expect(library).toBe(state.library.isFetching);
        });
    });
    describe('getErrorLibrary', () => {
        it('should return library error', () => {
            const library = getErrorLibrary(state);

            expect(library).toBe(state.library.error);
        });
    });
    describe('getLikedPlaylist', () => {
        it('should return library liked playlist', () => {
            const library = getLikedPlaylist(state);

            expect(library).toBe(state.library.data[0]);
        });
    });
    describe('getPlaylist', () => {
        it('should return playlist', () => {
            const id = 1;
            const createdSelector = getPlaylist(id);
            const library = createdSelector(state);

            expect(library).toBe(
                state.authentication.data.playlists.find((playlist) => {
                    return playlist.id === id;
                })
            );
        });
    });
    describe('getIsSubscribed', () => {
        it('should return is subscribed', () => {
            const id = 1;
            const createdSelector = getIsSubscribed(id);
            const library = createdSelector(state);

            expect(library).toBe(state.authentication.data.subscriptions.indexOf(id) !== -1);
        });
    });
});
