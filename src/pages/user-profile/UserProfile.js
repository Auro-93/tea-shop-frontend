import React, {useContext} from 'react'
import UserProfileUI from './UserProfileUI';
import { AuthContext } from '../../helpers/contexts/AuthContext';




const UserProfile = () => {
    
    const {handleLogout, user} = useContext(AuthContext);
    const[profileData] = user;
   

    return (
        <UserProfileUI
            handleLogout = {handleLogout}
            profileData = {profileData}
        />
    )
}

export default UserProfile
