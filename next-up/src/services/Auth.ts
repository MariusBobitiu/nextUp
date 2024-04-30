import { SignInData, SignUpData } from '../types/Auth';

export const signUp = async (data: SignUpData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SV_API_BASE_URL}/auth/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return await response.json();
    } catch (error) {
        console.error(error)
        return error;
    }
};

export const signIn = async (data: SignInData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SV_API_BASE_URL}/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return error;
    }
};