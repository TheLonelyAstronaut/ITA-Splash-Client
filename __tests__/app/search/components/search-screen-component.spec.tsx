import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
// eslint-disable-next-line no-restricted-imports
import * as ReactRedux from 'react-redux';
import * as Theme from 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';

import { tracks } from '../../../../__mocks__/data/tracks';
import { MockSelectors } from '../../../../__mocks__/mock-selectors';
import { SearchResultComponent } from '../../../../src/app/search/components/search-result.component';
import { EmptyText, SearchInput } from '../../../../src/app/search/components/styled/search-screen.styled';
import { SearchNavigationProps } from '../../../../src/app/search/routing.params';
import { SearchScreenComponent } from '../../../../src/app/search/screens/search-screen.component';
import { SearchResult, SearchResultType } from '../../../../src/app/search/search.types';
import { getIsFetching, getSearchResults } from '../../../../src/app/search/selectors';
import { darkTheme } from '../../../../src/app/ui/themes/themes';

describe('Search screen', () => {
    let wrapper: ShallowWrapper;
    let selectors: MockSelectors;
    let mockDispatch: jest.Mock;
    const mockTheme: DefaultTheme = darkTheme;

    const testResults: SearchResult[] = [
        ({
            type: SearchResultType.TRACK,
            data: tracks[0],
        } as unknown) as SearchResult,
    ];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createTestProps = (props: Record<string, unknown>) =>
        (({
            navigation: {
                navigate: jest.fn(),
            },
            route: {
                params: {
                    key: '123',
                },
            },
        } as unknown) as SearchNavigationProps<'SearchScreen'>);

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        selectors = new MockSelectors().mockSelector(getSearchResults, testResults).mockSelector(getIsFetching, false);

        mockDispatch = jest.fn();

        jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockDispatch);
        jest.spyOn(Theme, 'useTheme').mockReturnValue(mockTheme);

        const props = createTestProps({});
        wrapper = shallow(<SearchScreenComponent {...props} />);
    });

    describe('FlatList', () => {
        it('should render a list using user data', function () {
            const input = wrapper.find(SearchInput);
            input.props().onChangeText('123');

            expect(wrapper.find(FlatList).props().data).toBe(testResults);
        });
        it('should render using renderItem components', () => {
            const input = wrapper.find(SearchInput);
            input.props().onChangeText('test');
            const Renderer = wrapper.find(FlatList).props().renderItem as React.FC<ListRenderItem<SearchResult>>;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const item = shallow(<Renderer item={testResults[0]} index={0} separators={null!} />);

            expect(item.is(SearchResultComponent)).toBe(true);
            expect(item.props().data).toBe((testResults[0].data as unknown) as SearchResult);
        });
        it('should use a string version of the order item id for the key', () => {
            const input = wrapper.find(SearchInput);
            input.props().onChangeText('test');
            const item = wrapper.find(FlatList).props().keyExtractor;

            expect(item(testResults[0])).toBe(item.index + testResults[0].data.id);
        });
        it('should render empty text', () => {
            expect(wrapper.exists(EmptyText)).toEqual(true);
        });
        it('should render nothing founded text', () => {
            const input = wrapper.find(SearchInput);
            input.props().onChangeText('123');

            const item = wrapper.find(FlatList).props().ListEmptyComponent;
            expect(item).toBe(null);
        });
    });
});
