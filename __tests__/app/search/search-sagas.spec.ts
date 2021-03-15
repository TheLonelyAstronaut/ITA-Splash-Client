import { ExpectApi, expectSaga, testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { listenForSearchSaga, searchSaga } from '../../../src/app/search/sagas';
import { SEARCH_ALL } from '../../../src/app/search/actions';
import { client } from '../../../src/graphql/api';
import { Logger } from '../../../src/app/utils/logger';
import { SearchResult } from '../../../src/app/search/search.types';
import { throwError } from 'redux-saga-test-plan/providers';

describe('Search sagas', () => {
    describe('Search saga', () => {
        let saga: ExpectApi;
        const searchText = '123';
        const result: SearchResult[] = [];

        beforeEach(() => {
            saga = expectSaga(searchSaga, SEARCH_ALL.TRIGGER(searchText)).provide([
                [call.fn(client.search), []],
                [call.fn(Logger.error), undefined],
            ]);
        });
        it('should dispatch search all started action', async () => {
            await saga.put(SEARCH_ALL.STARTED()).run(false);
        });
        it('should dispatch search all completed action', async () => {
            await saga.put(SEARCH_ALL.COMPLETED({ result: result, text: searchText })).run(false);
        });
        it('should log console error', async () => {
            const testError = new Error('error');
            saga = expectSaga(searchSaga, SEARCH_ALL.TRIGGER(searchText)).provide([
                [call.fn(client.search), throwError(testError)],
                [call.fn(Logger.error), undefined],
            ]);

            await saga.call(Logger.error, testError).run(false);
        });
        it('should dispatch search completed with empty array', async () => {
            const testError = new Error('error');
            saga = expectSaga(searchSaga, SEARCH_ALL.TRIGGER(searchText)).provide([
                [call.fn(client.search), throwError(testError)],
                [call.fn(Logger.error), undefined],
            ]);

            await saga.put(SEARCH_ALL.COMPLETED({ text: searchText, result: [] })).run(false);
        });
    });
    describe('listenForSearchSaga', () => {
        it('should listen for trigger and run searchSaga', async () => {
            testSaga(listenForSearchSaga).next().takeLatest(SEARCH_ALL.TRIGGER, searchSaga);
        });
    });
});
