import React from 'react';
import { Platform } from 'react-native';

import { Album, Playlist } from '../../../../types/music';
import { LibraryElementType } from '../../../library/library.types';

import { MusicListTemplateScreen as MLAndroid } from './music-list-template-screen.component.android';
import { MusicListTemplateScreen as MLiOS } from './music-list-template-screen.component.ios';

export type MusicListTemplateScreenProps = {
    data: Album | Playlist;
    type?: LibraryElementType;
};

export const MusicListTemplateScreen: React.FC<MusicListTemplateScreenProps> = (props: MusicListTemplateScreenProps) =>
    Platform.OS === 'ios' ? <MLiOS {...props} /> : <MLAndroid {...props} />;
