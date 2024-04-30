import { useDispatch, useSelector } from "react-redux";
import { userState } from "@/types/Auth";
import { useEffect } from "react";
import { removeUser } from "@/features/user/userSlice";

const SignOut = () => {
    const user = useSelector((state: userState) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const signOut = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SV_API_BASE_URL}/users/sign-out/${user.username}/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                console.log('User signed out:', response)
                return await response.json();
            } catch (error) {
                console.error(error)
                return error;
            }
        }

        if (user) {
            const response = signOut();
            console.log("UseEffect: ", response)
        }
        dispatch(removeUser()); // Remove the argument passed to removeUser

        window
            .location
            .replace('/');
        
    }, [user]);

    return (
        <div>
            <h1>Signing out...</h1>
        </div>
    );
}

export default SignOut;