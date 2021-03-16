import RNTrackPlayer from 'react-native-track-player';
import { expectSaga, testSaga, ExpectApi } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { loginSaga, logoutSaga, registerSaga } from '../../../src/app/authentication/sagas';
import { LOGIN, LOGOUT, REGISTER } from '../../../src/app/authentication/actions';
import { client } from '../../../src/graphql/api';
import { User } from '../../../src/app/authentication/authentication.types';
import { firebase } from '../../../src/app/utils/firebase';
import { Logger } from '../../../src/app/utils/logger';
import { throwError } from 'redux-saga-test-plan/providers';

jest.mock('react-native-track-player', () => ({
    stop: jest.fn(),
    reset: jest.fn(),
}));

describe('Auth sagas', () => {
    describe('Login saga', () => {
        let saga: ExpectApi;
        const data = {
            token: '123',
            data: {} as User,
        };
        beforeEach(() => {
            saga = expectSaga(loginSaga, LOGIN.TRIGGER({ email: '123', password: '123' })).provide([
                [call.fn(client.login), data],
                [call.fn(firebase.login), undefined],
                [call.fn(Logger.error), undefined],
            ]);
        });
        it('should dispatch login started action', async () => {
            await saga.put(LOGIN.STARTED({ email: '123', password: '123' })).run(false);
        });
        it('should dispatch login completed action', async () => {
            await saga.put(LOGIN.COMPLETED(data)).run(false);
        });
        it('should log console error and dispatch failed login', async () => {
            const testError = new Error('error');
            saga = expectSaga(loginSaga, LOGIN.TRIGGER({ email: '123', password: '123' })).provide([
                [call.fn(client.login), throwError(testError)],
                [call.fn(firebase.login), undefined],
                [call.fn(Logger.error), undefined],
            ]);
            await saga.call(Logger.error, testError).run(false);
            await saga.put(LOGIN.COMPLETED.failed(testError)).run(false);
        });
    });
    describe('Register saga', () => {
        let saga: ExpectApi;
        const registerPayload = {
            username: '123',
            password: '123',
            email: '123',
        };
        const data = {
            token: '123',
            data: {} as User,
        };
        beforeEach(() => {
            saga = expectSaga(registerSaga, REGISTER.TRIGGER(registerPayload)).provide([
                [call.fn(client.register), data],
                [call.fn(firebase.register), undefined],
                [call.fn(Logger.error), undefined],
            ]);
        });
        it('should dispatch register completed action', async () => {
            await saga.put(REGISTER.COMPLETED(data)).run(false);
        });
        it('should log console error and dispatch failed register', async () => {
            const testError = new Error('error');
            saga = expectSaga(registerSaga, REGISTER.TRIGGER(registerPayload)).provide([
                [call.fn(client.register), throwError(testError)],
                [call.fn(firebase.register), undefined],
                [call.fn(Logger.error), undefined],
            ]);
            await saga.call(Logger.error, testError).run(false);
            await saga.put(REGISTER.COMPLETED.failed(testError)).run(false);
        });
    });
    describe('Logout saga', () => {
        let saga: ExpectApi;

        beforeEach(() => {
            saga = expectSaga(logoutSaga).provide([
                [call.fn(client.logout), undefined],
                [call.fn(firebase.logout), undefined],
                [call.fn(RNTrackPlayer.stop), undefined],
                [call.fn(RNTrackPlayer.reset), undefined],
            ]);
        });

        it('should dispatch logout completed', async () => {
            await saga.put(LOGOUT.COMPLETED()).run(false);
        });
    });
});
