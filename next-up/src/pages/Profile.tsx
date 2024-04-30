import { userState } from '@/types/Auth';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const user = useSelector((state: userState) => state.user.user);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
        }
        console.log(user);
    }, [user]);

  return (
    <>
        {isAuthenticated ? (
            <div className='size-full px-12 flex-col justify-center items-center'>
                <div className='w-full flex justify-between items-center bg-gradient-to-br from-navy-600 to-navy-400 py-8 px-12 rounded-lg'>
                    <div className='flex justify-center items-center'>
                    {user.profilePicture !== '' ? 
                    <img src={user.profilePicture} alt='profile' className='w-32 h-32 rounded-full' /> 
                    : <img src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png' alt='profile' className='w-32 h-32 rounded-full' />}
                    <div className='ml-4'>
                        <h1 className='text-2xl'>{user.username}</h1>
                        <small className='text-sm'>{user.email}</small>
                        <p className='text-lg'>Member since {new Date(user.createdAt).toLocaleDateString('en-GB')}</p>
                    </div>
                    </div>
                    <div className=''>
                        <h1 className='text-2xl'>Your Posts</h1>
                        <p className='text-lg'>You have 0 posts</p>
                    </div>
                </div>
            </div>
        ) : (
            <h1>Not authenticated</h1>
        )}
    </>
  )
}

export default Profile