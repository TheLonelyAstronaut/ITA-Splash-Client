import { showMessage } from 'react-native-flash-message';
import { ExpectApi, expectSaga, testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';

import { SHOW_FLASHBAR } from '../../../../src/app/utils/flashbar/actions';
import { FlashbarEnum } from '../../../../src/app/utils/flashbar/flashbar.types';
import { flashbarSaga, listenFlashbarSaga } from '../../../../src/app/utils/flashbar/sagas';

describe('Flashbar sagas', () => {
    describe('flashbar saga', () => {
        let saga: ExpectApi;
        const message = {
            type: 'success',
            message: '123',
            description: '123',
        };
        beforeEach(() => {
            saga = expectSaga(
                flashbarSaga,
                SHOW_FLASHBAR({
                    type: FlashbarEnum.Success,
                    message: '123',
                    description: '123',
                })
            ).provide([[call.fn(showMessage), undefined]]);
        });

        it('should display flashbar', async () => {
            await saga.call(showMessage, message).run(false);
        });
    });
    describe('listenForFlashbarSaga', () => {
        it('should listen for trigger and run flashbarSaga', async () => {
            testSaga(listenFlashbarSaga).next().takeLatest(SHOW_FLASHBAR, flashbarSaga);
        });
    });
});
