import * as ReactRedux from 'react-redux';
import { Selector } from 'reselect';

interface MockSelectorConfig<State, T> {
    selector: Selector<State, T>;
    value: T;
}

export class MockSelectors {
    mocks: Array<MockSelectorConfig<never, unknown>> = [];
    useSelectorSpy: jest.SpyInstance | null = null;

    constructor() {
        this.init();
    }

    _handleSelect = (selector: any) => {
        const matched = this.mocks.find((x) => x.selector === selector);

        if (!matched) {
            throw new Error(`couldn't find mocked selector value for: ${selector}`);
        }

        return matched.value;
    };

    mockSelector = <State, T>(selector: Selector<State, T>, value: T): this => {
        this.clearSelector(selector);
        this.mocks = [...this.mocks, { selector, value }];
        return this;
    };

    clearSelector = <State, T>(selector: Selector<State, T>): this => {
        this.mocks = this.mocks.filter((c) => c.selector !== selector);
        return this;
    };

    reset = (): this => {
        this.mocks = [];

        if (this.useSelectorSpy) {
            this.useSelectorSpy.mockRestore();
        }

        return this;
    };

    init = (): this => {
        if (this.useSelectorSpy) {
            throw new Error('already initialised');
        }

        this.useSelectorSpy = jest.spyOn(ReactRedux, 'useSelector').mockImplementation(this._handleSelect);

        return this;
    };
}
