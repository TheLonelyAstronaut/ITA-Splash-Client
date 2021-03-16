import { ApplicationState } from '../../../src/app/store/application-state.types';
import { getIsFetching, getRootSearchState, getSearchResults, getSearchText } from '../../../src/app/search/selectors';
import { SearchState } from '../../../src/app/search/search.types';

describe('Search selectors', () => {
    const state: ApplicationState = {
        search: ({
            isFetching: false,
            error: undefined,
            searchText: 'Post Malone',
            results: [],
        } as unknown) as SearchState,
    } as ApplicationState;

    describe('getRootSearchState', () => {
        it('should return search state', () => {
            const search = getRootSearchState(state);

            expect(search).toBe(state.search);
        });
    });
    describe('getSearchText', () => {
        it('should return search text', () => {
            const search = getSearchText(state);

            expect(search).toBe(state.search.searchText);
        });
    });
    describe('getSearchResults', () => {
        it('should return search result', () => {
            const search = getSearchResults(state);

            expect(search).toBe(state.search.results);
        });
    });
    describe('getIsFetching', () => {
        it('should return is fetching', function () {
            const search = getIsFetching(state);

            expect(search).toBe(state.search.isFetching);
        });
    });
});
