export type LoginResponse = {
    login: {
        accessToken: string;
    };
};

export type RegisterResponse = {
    register: {
        accessToken: string;
    };
};

export type LoginInput = {
    data: {
        email: string;
        password: string;
        FCMToken: string;
    };
};

export type RegisterInput = LoginInput & {
    data: {
        email: string;
        password: string;
        FCMToken: string;
        username: string;
    };
};
