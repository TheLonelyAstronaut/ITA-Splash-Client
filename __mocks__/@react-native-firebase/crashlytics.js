const mockLog = jest.fn();
const mockRecordError = jest.fn();
const mockCrash = jest.fn();

export default () => ({
    log: mockLog,
    recordError: mockRecordError,
    crash: mockCrash,
});
