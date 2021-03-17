import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { FlatList } from 'react-native';
// eslint-disable-next-line no-restricted-imports
import * as ReactRedux from 'react-redux';
import { DefaultTheme } from 'styled-components/native';
import * as Theme from 'styled-components/native';

import { playlist } from '../../../../__mocks__/data/playlists';
import { MockSelectors } from '../../../../__mocks__/mock-selectors';
import {
    AddPlaylistModal,
    Indicator,
    PlaylistInput,
} from '../../../../src/app/library/components/styled/library-screen.styled';
import { LibraryStackNavigationProps } from '../../../../src/app/library/routing.params';
import { LibraryScreen } from '../../../../src/app/library/screens/library-screen.component';
import { getIsFetchingLibrary, getLibrary, getRootLibraryState } from '../../../../src/app/library/selectors';
import { darkTheme } from '../../../../src/app/ui/themes/themes';
import { AddPlaylistItem } from '../../../../src/app/library/components/add-playlist.component';
import { withHooks } from 'jest-react-hooks-shallow/lib/enable-hooks';

describe('Library screen', () => {
    let wrapper: ShallowWrapper;
    let selectors: MockSelectors;
    let mockDispatch: jest.Mock;
    const mockTheme: DefaultTheme = darkTheme;
    const testLibrary = {
        isFetching: false,
        error: undefined,
        data: playlist,
    };

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
        withHooks(() => {
            wrapper = shallow(<LibraryScreen {...props} />);
        });
    });

    describe('FlatList', () => {
        it('should render playlists from user', () => {
            expect(wrapper.find(FlatList).props().data).toBe(testLibrary.data);
        });
        it('should render indicator', () => {
            selectors.mockSelector(getIsFetchingLibrary, true);
            expect(wrapper.exists(Indicator)).toBe(false);
        });
        it('should modal visible be false by initial', function () {
            const modal = wrapper.find(AddPlaylistModal).props().visible;

            expect(modal).toBe(false);
        });
        it('should pop up modal', () => {
            expect(wrapper.find(FlatList).props().data).toBe(testLibrary.data);

            const flatList = wrapper.find(FlatList);
            const item = wrapper.find(FlatList).props().ListHeaderComponent;

            item.props.onPress();
            wrapper.setProps({ please: 'update' });
            const modal = wrapper.find(AddPlaylistModal).props().visible;

            expect(item).toBe(flatList.props().ListHeaderComponent);
            expect(modal).toBe(true);
        });
        it('should change text input', function () {
            withHooks(() => {
                wrapper = shallow(<AddPlaylistModal />);
            });
            expect(wrapper.exists(PlaylistInput)).toBe(true);
        });
    });
});
