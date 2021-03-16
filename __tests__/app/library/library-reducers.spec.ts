import { LOAD_LIBRARY } from '../../../src/app/library/actions';
import { LibraryParams, libraryReducer } from '../../../src/app/library/reducers';
import { Playlist } from '../../../src/types/music';

describe('Library reducers', () => {
    const before = {
        isFetching: false,
        error: undefined,
        data: [],
    };
    const testData = [] as Playlist[];

    describe('initial state', () => {
        let output: LibraryParams;

        beforeEach(() => {
            output = libraryReducer(undefined, { type: '@@INIT@@' });
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

    describe(`'${LOAD_LIBRARY.STARTED.actionType}' action`, () => {
        it('should set isFetching in true', () => {
            const output = libraryReducer(before, LOAD_LIBRARY.STARTED());

            expect(output.isFetching).toEqual(true);
        });
    });
    describe(`'${LOAD_LIBRARY.COMPLETED.actionType}' action`, () => {
        it('should set isFetching in false', () => {
            const output = libraryReducer(before, LOAD_LIBRARY.COMPLETED(testData));

            expect(output.isFetching).toEqual(false);
        });
    });
    describe(`'${LOAD_LIBRARY.COMPLETED.actionType}' action`, () => {
        it('should set payload data to state data', () => {
            const output = libraryReducer(before, LOAD_LIBRARY.COMPLETED(testData));

            expect(output.data).toEqual(testData);
        });
    });
    describe(`'${LOAD_LIBRARY.COMPLETED.failed.actionType}' action`, () => {
        it('should throw an error', () => {
            const output = libraryReducer(before, LOAD_LIBRARY.COMPLETED.failed(new Error('error')));

            expect(output.error).toEqual(new Error('error'));
        });
    });
});
