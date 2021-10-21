
import React from 'react'
import { useState} from 'react';
import { useHistory } from 'react-router-dom';
import './Admin.css';


const AdminLogin = () => {
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    let history = useHistory();
    const adminLogin = () => {
        if (adminEmail.trim() === process.env.REACT_APP_ADMIN_LOGIN_EMAIL && adminPassword.trim() === process.env.REACT_APP_ADMIN_LOGIN_KEY_WORD) {
            history.push('/Dashbord/?id=pass');
        }
        else {
            alert('login incorrect, veuillez verifier vos login')
        }
    }
    return (
        <div>
            <div className='accueil admin'>
                <h1>Admin Log In</h1>
                <input className='client-form-name' placeholder='Admin Email' value={adminEmail} onChange={(e) => { setAdminEmail(e.target.value) }} />
                <input className='client-form-name' type='password' placeholder='Mot de passe' value={adminPassword} onChange={(e) => { setAdminPassword(e.target.value) }} />
                <button className='submit-button' onClick={adminLogin}>LOG IN</button>
            </div>
        </div>
    );
}

export default AdminLogin
