import { createAction } from 'typesafe-redux-helpers';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    password: string;
    phone: string;
}

export interface AuthCompletedPayload {
    username: string;
    token: string;
}

export const LOGIN = {
    TRIGGER: createAction('[Login] Trigger', (payload: LoginPayload) => payload),
    STARTED: createAction('[Login] Started', (payload: LoginPayload) => payload),
    COMPLETED: createAction('[Login] Completed', (payload: AuthCompletedPayload) => payload),
};

export const REGISTER = {
    TRIGGER: createAction('[Register] Trigger', (payload: RegisterPayload) => payload),
    STARTED: createAction('[Register] Started', (payload: RegisterPayload) => payload),
    COMPLETED: createAction('[Register] Completed', (payload: AuthCompletedPayload) => payload),
};

export const LOGOUT = {
    TRIGGER: createAction('[Logout] Trigger'),
    COMPLETED: createAction('[Logout] Completed'),
};
