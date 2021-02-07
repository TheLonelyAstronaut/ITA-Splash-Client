export interface UserProps {
    email: string;
    password: string;
    username: string;
    token?: string;
}

export const users: UserProps[] = [
    {
        email: 'vlad',
        password: '123',
        username: 'vlad',
        token: '123qwe',
    },
    {
        email: 'vadim',
        password: '1234',
        username: 'vadim',
        token: '1234qwe',
    },
    {
        email: 'kekes',
        password: '12345',
        username: 'kekes',
        token: '12345qwe',
    },
];
