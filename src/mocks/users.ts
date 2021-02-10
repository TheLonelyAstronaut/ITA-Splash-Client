import { User } from '../app/authentication/authentication.types';

export const users: User[] = [
    {
        email: 'vlad',
        password: '123',
        username: 'Vladislav',
        token: '123qwe',
        profileImg: require('../assets/profile-image.jpg'),
    },
    {
        email: 'vadim',
        password: '1234',
        username: 'vadim',
        token: '1234qwe',
        profileImg: require('../assets/profile-image.jpg'),
    },
    {
        email: 'kekes',
        password: '12345',
        username: 'kekes',
        token: '12345qwe',
        profileImg: require('../assets/profile-image.jpg'),
    },
];
