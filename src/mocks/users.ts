import { User } from '../app/authentication/authentication.types';

export const users: User[] = [
    {
        id: 1,
        email: 'vlad@gmail.com',
        username: 'Vladislav',
        token: '123qwe',
        profileImg: require('../assets/profile-image.jpg'),
    },
    {
        id: 2,
        email: 'vadim',
        username: 'vadim',
        token: '1234qwe',
        profileImg: require('../assets/profile-image.jpg'),
    },
    {
        id: 3,
        email: 'kekes',
        username: 'kekes',
        token: '12345qwe',
        profileImg: require('../assets/profile-image.jpg'),
    },
];
