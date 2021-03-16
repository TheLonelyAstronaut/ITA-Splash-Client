import { playlist } from '../../../__mocks__/data/playlists';
import { homeReducer, HomeStateProps } from '../../../src/app/home/reducers';
import { LOAD_HOME_DATA } from '../../../src/app/home/actions';

describe('Homepage reducers', () => {
    const before = {
        isFetching: false,
        error: undefined,
        data: [],
    };
    const testData = [
        {
            title: '123',
            data: [],
        },
    ];
    describe('initial state', () => {
        let output: HomeStateProps;

        beforeEach(() => {
            output = homeReducer(undefined, { type: '@@INIT@@' });
        });
        it('should have data as an empty array by default', () => {
            expect(output.data).toEqual([]);
        });

        it('should set isFetching as false by default', () => {
            expect(output.isFetching).toEqual(false);
        });

        it('should set error as undefined by default', () => {
            expect(output.error).toEqual(undefined);
        });
    });

    describe(`'${LOAD_HOME_DATA.STARTED.actionType}' action`, () => {
        it('should set isFetching in true', () => {
            const output = homeReducer(before, LOAD_HOME_DATA.STARTED());

            expect(output.isFetching).toEqual(true);
        });
    });
    describe(`'${LOAD_HOME_DATA.COMPLETED.actionType}' action`, () => {
        it('should set isFetching in false', () => {
            const output = homeReducer(before, LOAD_HOME_DATA.COMPLETED([]));

            expect(output.isFetching).toEqual(false);
        });
    });
    describe(`'${LOAD_HOME_DATA.COMPLETED.actionType}' action`, () => {
        it('should set error to undefined', () => {
            const output = homeReducer(before, LOAD_HOME_DATA.COMPLETED([]));

            expect(output.error).toEqual(undefined);
        });
    });
    describe(`'${LOAD_HOME_DATA.COMPLETED.actionType}' action`, () => {
        it('should set action payload to data', () => {
            const output = homeReducer(before, LOAD_HOME_DATA.COMPLETED(testData));

            expect(output.data).toEqual(testData);
        });
    });
    describe(`'${LOAD_HOME_DATA.COMPLETED.failed.actionType}' action`, () => {
        const testError = new Error('error');
        it('should set error from payload', () => {
            const output = homeReducer(before, LOAD_HOME_DATA.COMPLETED.failed(testError));

            expect(output.error).toEqual(testError);
        });
    });
});
