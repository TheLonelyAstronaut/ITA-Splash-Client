import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { MockSelectors } from '../../../../__mocks__/mock-selectors';
import { DefaultTheme } from 'styled-components/native';
import { darkTheme } from '../../../../src/app/ui/themes/themes';
import { getIsFetchingLibrary, getLibrary, getRootLibraryState } from '../../../../src/app/library/selectors';
import { LibraryData } from '../../../../src/app/library/library.types';
import * as ReactRedux from 'react-redux';
import * as Theme from 'styled-components/native';
import { LibraryStackNavigationProps } from '../../../../src/app/library/routing.params';
import { LibraryScreen } from '../../../../src/app/library/screens/library-screen.component';
import { FlatList } from 'react-native';
import { AddPlaylistModal, Indicator } from '../../../../src/app/library/components/styled/library-screen.styled';
import { AddPlaylistItem } from '../../../../src/app/library/components/add-playlist.component';

describe('Library screen', () => {
    let wrapper: ShallowWrapper;
    let selectors: MockSelectors;
    let mockDispatch: jest.Mock;
    const mockTheme: DefaultTheme = darkTheme;
    const testLibrary = {
        isFetching: false,
        error: undefined,
        data: [] as LibraryData[],
    };

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
        } as unknown) as LibraryStackNavigationProps<'PlaylistsScreen'>);

    beforeEach(() => {
        selectors = new MockSelectors()
            .mockSelector(getIsFetchingLibrary, false)
            .mockSelector(getRootLibraryState, testLibrary)
            .mockSelector(getLibrary, testLibrary.data);

        mockDispatch = jest.fn();

        jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockDispatch);
        jest.spyOn(Theme, 'useTheme').mockReturnValue(mockTheme);

        const props = createTestProps({});
        wrapper = shallow(<LibraryScreen {...props} />);
    });

    describe('FlatList', () => {
        it('should render playlists from user', () => {
            expect(wrapper.find(FlatList).props().data).toBe(testLibrary.data);
        });
        it('should render playlists from user', () => {
            selectors.mockSelector(getIsFetchingLibrary, true);
            expect(wrapper.exists(Indicator)).toBe(false);
        });

        it('should pop up modal', () => {
            let testFunc: () => void;
            expect(wrapper.find(FlatList).props().data).toBe(testLibrary.data);
            const item = wrapper.find(FlatList).props().ListHeaderComponent;
            //wrapper.find(AddPlaylistItem).simulate('click');
            // expect(wrapper.exists(AddPlaylistItem)).toBe(true)
            // expect(wrapper.exists(AddPlaylistModal)).toBe(true);
            expect(item).toBe(<AddPlaylistItem onPress={() => testFunc} />);
        });
    });
});
