export interface userProps {
    login: string;
    password: string;
    username: string;
    token: string;
}

export const users: userProps[] = [
    {
        login: 'vlad',
        password: '123',
        username: 'vlad',
        token: '123qwe',
    },
    {
        login: 'vadim',
        password: '1234',
        username: 'vadim',
        token: '1234qwe',
    },
    {
        login: 'kekes',
        password: '12345',
        username: 'kekes',
        token: '12345qwe',
    },
];
