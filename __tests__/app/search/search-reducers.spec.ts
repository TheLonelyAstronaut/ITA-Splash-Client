import { SEARCH_ALL, SearchPayload } from '../../../src/app/search/actions';
import { SearchState } from '../../../src/app/search/search.types';
import { searchReducer } from '../../../src/app/search/reducers';

describe('Search reducers', () => {
    const before = {
        searchText: '',
        results: [],
        isFetching: false,
        error: undefined,
    };
    const testData: SearchPayload = {
        text: '123',
        result: [],
    };
    describe('initial state', () => {
        let output: SearchState;

        beforeEach(() => {
            output = searchReducer(undefined, { type: '@@INIT@@' });
        });
        it('should have results as an empty array by default', () => {
            expect(output.results).toEqual([]);
        });

        it('should set isFetching as false by default', () => {
            expect(output.isFetching).toEqual(false);
        });

        it('should set error as undefined by default', () => {
            expect(output.error).toEqual(undefined);
        });
        it('should set searchText to empty string by default', () => {
            expect(output.searchText).toEqual('');
        });
    });
    describe(`'${SEARCH_ALL.TRIGGER.actionType}'`, () => {
        it('should set searchText from payload value', () => {
            const output = searchReducer(before, SEARCH_ALL.TRIGGER('123'));

            expect(output.searchText).toEqual('123');
        });
    });
    describe(`'${SEARCH_ALL.TRIGGER.actionType}'`, () => {
        it('should set isFetching to true', () => {
            const output = searchReducer(before, SEARCH_ALL.TRIGGER('123'));

            expect(output.isFetching).toEqual(true);
        });
    });
    describe(`'${SEARCH_ALL.COMPLETED.actionType}'`, () => {
        it('should set isFetching to false', () => {
            const output = searchReducer(before, SEARCH_ALL.COMPLETED(testData));

            expect(output.isFetching).toEqual(false);
        });
    });
    describe(`'${SEARCH_ALL.COMPLETED.actionType}'`, () => {
        it('should set search text from payload value', () => {
            const output = searchReducer(before, SEARCH_ALL.COMPLETED(testData));

            expect(output.searchText).toEqual(testData.text);
        });
    });
    describe(`'${SEARCH_ALL.COMPLETED.actionType}'`, () => {
        it('should set result from payload value', () => {
            const output = searchReducer(before, SEARCH_ALL.COMPLETED(testData));

            expect(output.results).toEqual(testData.result);
        });
    });
    describe(`'${SEARCH_ALL.COMPLETED.failed.actionType}'`, () => {
        const testError = new Error('error');
        it('should set error from payload value', () => {
            const output = searchReducer(before, SEARCH_ALL.COMPLETED.failed(testError));

            expect(output.error).toEqual(testError.message);
        });
    });
});
