import { expectSaga, testSaga, ExpectApi } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { CHANGE_PASSWORD, LOAD_HOME_DATA } from '../../../src/app/home/actions';
import { HomepageData } from '../../../src/app/home/home.types';
import {
    changePasswordSaga,
    listenForChangePasswordSaga,
    listenForLoadHomepage,
    loadHomePageSaga,
} from '../../../src/app/home/sagas';
import { firebase } from '../../../src/app/utils/firebase';
import { Logger } from '../../../src/app/utils/logger';
import { client } from '../../../src/graphql/api';
describe('Home sagas', () => {
    describe('Change password saga', () => {
        let saga: ExpectApi;
        const currentPass = '123';
        const newPass = '1234';
        const repeatNewPass = '1234';

        beforeEach(() => {
            saga = expectSaga(
                changePasswordSaga,
                CHANGE_PASSWORD.TRIGGER({ currentPass: currentPass, newPass: newPass, repeatNewPass: repeatNewPass })
            ).provide([
                [call.fn(client.changePassword), { currentPass, newPass }],
                [call.fn(Logger.error), undefined],
                [call.fn(firebase.passwordChanged), undefined],
            ]);
        });
        it('should call change password func', async () => {
            await saga.call(client.changePassword, currentPass, newPass).run(false);
        });
        // it('should show flashbar on error', async ()=> {
        //     const testError = new Error('error');
        //     const flashbar = {
        //         description: I18n.t('flashbar.somethingWentWrong'),
        //         type: FlashbarEnum.Danger,
        //         message: I18n.t('flashbar.tryAgain'),
        //     }
        //
        //     saga = expectSaga(loadHomePageSaga).provide([
        //         [call.fn(client.changePassword), throwError(testError)],
        //         [call.fn(Logger.error), undefined],
        //         [call.fn(SHOW_FLASHBAR), flashbar],
        //         [call.fn(firebase.passwordChanged), undefined]
        //     ])
        //
        //     await saga.put(SHOW_FLASHBAR(flashbar)).run(false);
        // });
    });
    describe('Load homepage data saga', () => {
        let saga: ExpectApi;
        const homepageData: HomepageData[] = [
            {
                title: '123',
                data: [],
            },
        ];

        beforeEach(() => {
            saga = expectSaga(loadHomePageSaga).provide([
                [call.fn(Logger.error), undefined],
                [call.fn(client.getHomepageData), homepageData],
            ]);
        });

        it('should dispatch a started action', async () => {
            await saga.put(LOAD_HOME_DATA.STARTED()).run(false);
        });
        it('should dispatch a completed action', async () => {
            await saga.put(LOAD_HOME_DATA.COMPLETED(homepageData)).run(false);
        });
        it('should log the error', async () => {
            const testError = new Error('error');

            saga = expectSaga(loadHomePageSaga).provide([
                [call.fn(client.getHomepageData), throwError(testError)],
                [call.fn(Logger.error), undefined],
            ]);

            await saga.call(Logger.error, testError).run(false);
        });
    });
    describe('listenForChangePasswordSaga', () => {
        it('should listen for change password saga', () => {
            testSaga(listenForChangePasswordSaga).next().takeLatest(CHANGE_PASSWORD.TRIGGER, changePasswordSaga);
        });
    });
    describe('listenForLoadHomepageDataSaga', () => {
        it('should listen for load homepage data saga', () => {
            testSaga(listenForLoadHomepage).next().takeLatest(LOAD_HOME_DATA.TRIGGER, loadHomePageSaga);
        });
    });
});
