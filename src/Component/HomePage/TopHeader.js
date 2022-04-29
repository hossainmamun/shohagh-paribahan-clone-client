import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App.js';
import '../../Style/TopHeader.scss';
import { getAuth, signOut } from "firebase/auth";
import initializeAuth from '../GoogleAccount/firebase.init.js';

initializeAuth();

const TopHeader = () => {
    const [loggedINUser, setLoggedInUser] = useContext(userContext);
    const auth = getAuth();

    // sign out function
    const signOutUser = () => {
        signOut(auth).then(() => {
            setLoggedInUser({});
        })
            .catch((error) => {
                if(error){
                    window.alert('something wrong when signOut');
                }
            });
    }
    return (
        <section id='top-header' className='container'>
            <div className="top-header">
                <span>
                    <i class="fa-solid fa-phone-volume"></i>
                    <a className='mobile' href="tel:+8809606444777">+88 09606444777</a>
                </span>
                <div className='link-list'>
                    {
                        loggedINUser.userEmail ?
                            <div>
                                <span className='text-secondary me-3'>{loggedINUser.userName}</span>
                                <button onClick={signOutUser} className='btn btn-danger px-3 rounded-1'>SignOut</button>
                            </div>
                            :
                            <Link to="/login_signup" className='link'>Login | SignUp</Link>
                    }
                </div>
            </div>
        </section>
    );
};

export default TopHeader;