import { HomeStateProps } from '../../../src/app/home/reducers';
import { getError, getHomepageData, getIsFetching, getRootHomepageState } from '../../../src/app/home/selectors';
import { ApplicationState } from '../../../src/app/store/application-state.types';

describe('Home selectors', () => {
    const state: ApplicationState = {
        homepage: {
            isFetching: false,
            error: undefined,
            data: [],
        } as HomeStateProps,
    } as ApplicationState;

    describe('getRootHomepageState', () => {
        it('should return homepage state', () => {
            const home = getRootHomepageState(state);

            expect(home).toBe(state.homepage);
        });
    });
    describe('getHomepageData', () => {
        it('should return homepage data', () => {
            const home = getHomepageData(state);

            expect(home).toBe(state.homepage.data);
        });
    });
    describe('getIsFetching', () => {
        it('should return is fetching', () => {
            const home = getIsFetching(state);

            expect(home).toBe(state.homepage.isFetching);
        });
    });
    describe('getError', () => {
        it('should return error', () => {
            const home = getError(state);

            expect(home).toBe(state.homepage.error);
        });
    });
});
