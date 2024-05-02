import { SignInData, SignUpData } from '../types/Auth';

export const signUp = async (formData: SignUpData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SV_API_BASE_URL}/auth/sign-up`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = await response.json()
        if (!response.ok) {
            console.error("Sign up failed", data);
            return { success: false, error: data.error || 'Signup Failed'};
        }

        return { success: true, user: data.user };
    } catch (error) {
        console.error(error)
        return { success: false, error: 'Signup Failed' };
    }
};

export const signIn = async (formData: SignInData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SV_API_BASE_URL}/auth/sign-in`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = await response.json()
        if (!response.ok) {
            console.error("Sign in failed", data);
            return { success: false, error: data.error || 'Signin Failed'};
        }
        return { success: true, user: data.user };
    } catch (error) {
        console.error(error)
        return { success: false, error: error || 'Signin Failed' };
    }
};