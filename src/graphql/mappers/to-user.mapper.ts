import { UserOutput } from '../types/user.types';
import { User } from '../../app/authentication/authentication.types';

export const fromUserOutput = (userOutput: UserOutput, token: string): User => {
    return {
        ...userOutput.getCurrentUser,
        token,
    };
};
