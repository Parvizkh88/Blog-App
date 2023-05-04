import React from 'react';
import { useParams } from 'react-router-dom'
import { activateUser } from '../services/UserService'

const Activate = () => {
    // we want to grab the token from url using useParams hook
    const { token } = useParams();
    // want to see if I am getting the token or not
    // console.log(token);

    const handleActivateUser = async () => {
        // now that we receive the token in url in frontend 
        // as shown above , we can send it as an opject to backend
        await activateUser({ token });
    }
    return (
        <div>
            <button
                onClick={handleActivateUser}
            >Activate User</button>
        </div>
    )
}

export default Activate