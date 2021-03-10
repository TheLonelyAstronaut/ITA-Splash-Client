import { User } from '../../app/authentication/authentication.types';
import { UserOutput } from '../types/user.types';

export const fromUserOutput = (userOutput: UserOutput, token: string): User => {
    return {
        ...userOutput.getCurrentUser,
        token,
    };
};
