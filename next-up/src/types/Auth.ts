import { MovieProps } from '@/types/MovieCard';

export type SignUpData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type SignInData = {
    email?: string;
    username?: string;
    password: string;
};

export type userState = {
    user: {
        user: {
            username: string;
            email: string;
            password: string;
            profilePicture: string;
            createdAt: string;
            watchList: MovieProps[];
        }
    };
};
