export type UserOutput = {
    getCurrentUser: {
        id: number;
        email: string;
        username: string;
        subscriptions: number[];
    };
};
