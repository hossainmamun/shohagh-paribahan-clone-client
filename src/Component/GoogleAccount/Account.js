import React, { useContext, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import initializeAuth from './firebase.init.js';
import TopHeader from '../HomePage/TopHeader.js';
import Navigation from '../Reuse/Navigation.js';
import { userContext } from '../../App.js';
import { useLocation, useNavigate } from 'react-router-dom';
initializeAuth();

const Account = () => {
    // googleAuthProvider
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    // context api
    const [loggedINUser, setLoggedInUser] = useContext(userContext);
    // declare useState hook
    const [signUp, setSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [user, setUser] = useState({
        isSignIn: false,
        userName: '',
        userEmail: '',
        userPhoto: '',
    })

    // private route element
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    // google signIn
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const signInUser = {
                    isSignIn: true,
                    userName: displayName,
                    userEmail: email,
                    userPhoto: photoURL,
                }
                setUser(signInUser);
                setLoggedInUser(signInUser);
                navigate(from);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email, credential);
            });
    }

    // input value onchange function
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePssChange = (e) => {
        setPassword(e.target.value);
    }

    // handle registration with email and password (onsubmit function)
    const handleRegistration = (e) => {
        e.preventDefault();

        if (signUp) {
            // pass strength validation with regex
            if (password.length < 6) {
                setError('password must be contain at list six character');
                return;
            }
            else if (!/(?=.*[!@#$&*])/.test(password)) {
                setError('password must be contain at list one special character');
                return;
            }
            else {
                setError('');
            }
            // call createUser function
            createUser(email, password);
        }
        // call login user function
        else {
            loginUser(email, password);
        }
    }

    // create new user with email & pass
    const createUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setSuccess('user account create successfully');
                setError('');
                verificationEmail();
                updateUserName();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
                setSuccess('')
            });
    }
    // login with email & pass
    const loginUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                const { displayName, email } = result.user;
                const loginUser = {
                    userName: displayName,
                    userEmail: email
                }
                setUser(loginUser);
                setLoggedInUser(loginUser);
                navigate(from);
                setSuccess('account login successfully');
                setError('');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
                setSuccess('')
            });
    }

    // send a verification email to user when signUp
    const verificationEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then((result) => {
                
            });
    }

    // forgot pass (send a password reset email to reset password)
    const handleForgotPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then((result) => {
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    // update user name when user signup
    const updateUserName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then((result) => {
                
            })
            .catch((error) => {
                
            });
    }
    

    // toggle signUp & logIn
    const toggleLogIn = () => {
        setSignUp(!signUp)
        setSuccess('');
        setError('');
    }
    const toggleSignIn = () => {
        setSignUp(!signUp)
        setSuccess('');
        setError('');
    }

    return (
        <section>
            {/* ---------- top header & navigation ---------- */}
            <TopHeader />
            <Navigation />

            <div className="container">
                {/* ---------- signUP with email ---------- */}
                <div className='row justify-content-center mt-5'>
                    <div className="col-md-6 p-5" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px' }}>
                        <div className='text-center my-5'>
                            {
                                signUp ?
                                    <h4 className='fw-normal'>SignUp</h4> :
                                    <h4 className='fw-normal'>Login Your Account</h4>
                            }
                        </div>
                        {/* ---------- form start --------- */}
                        <form onSubmit={handleRegistration}>
                            <div className="form-group">
                                {
                                    signUp &&
                                    < div className="row align-items-center my-2">
                                        <div className="col-3 text-center px-0">
                                            <h6 className='d-inline-block'>Enter Name:</h6>
                                        </div>
                                        <div className="col-9 px-0">
                                            <input type="text" name="name" id="" onChange={handleNameChange} className='form-control rounded-0 py-3' placeholder='Enter Full Name' required />
                                        </div>
                                    </div>
                                }

                                <div className="row align-items-center my-3">
                                    <div className="col-3 text-center px-0">
                                        <h6 className='d-inline-block'>Enter Email:</h6>
                                    </div>
                                    <div className="col-9 px-0">
                                        <input type="email" name="email" id="" onChange={handleEmailChange} className='form-control rounded-0 py-3' placeholder='Enter valid Email' required />
                                    </div>
                                </div>

                                <div className="row align-items-center my-3">
                                    <div className="col-3 text-center px-0">
                                        <h6 className='d-inline-block'>Enter Password:</h6>
                                    </div>
                                    <div className="col-9 px-0">
                                        <input type="password" name="password" id="" onChange={handlePssChange} className='form-control rounded-0 py-3' placeholder='Enter Password' required />
                                    </div>
                                </div>

                                <div className="row justify-content-end my-3">
                                    <div className="col-9 px-0">
                                        {
                                            signUp ?
                                                <input type="submit" className='form-control btn btn-primary rounded-1 py-3' value="SIGNUP" /> :
                                                <input type="submit" className='form-control btn btn-success rounded-1 py-3' value="LOGIN" />
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* ----------- forgot password or reset password -------------- */}
                        <div className='mt-4 mb-2'>
                            <span onClick={handleForgotPassword} className='text-danger' style={{ cursor: 'pointer', marginLeft: '135px' }}>Forgot Password ?</span>
                        </div>
                        {/* ------------ toggle signUp & login btn ----------- */}
                        <div className='mt-2' style={{marginLeft: '135px'}}>
                            {
                                signUp ?
                                    <div className='d-flex'>
                                        <span className='text-primary me-4'>All ready have an account ?</span>
                                        <span onClick={toggleLogIn} style={{ cursor: 'pointer' }}>Login</span>
                                    </div> :
                                    <div className='d-flex'>
                                        <span className='text-success me-4'>Don't have an account ?</span>
                                        <span onClick={toggleSignIn} style={{ cursor: 'pointer' }}>SignUp</span>
                                    </div>
                            }

                        </div>
                    </div>

                    {/* --------- error message --------- */}
                    <div className='my-4'>
                        {
                            success ?
                                <p className='text-success text-center text-capitalize'>{success}</p> :
                                <p className='text-danger text-center text-capitalize' >{error}</p>
                        }
                    </div>
                </div>
                {/* ---------- continue with google --------- */}
                <div className='text-center my-4'>
                    <p>---------- Continue With Google ---------</p>
                    <button
                        onClick={handleGoogleSignIn}
                        className='btn btn-outline-dark rounded-1 px-5 py-3 text-uppercase'
                        style={{ fontSize: '17px', letterSpacing: '.5px' }}>
                        <i class="fa-brands fa-google" style={{ marginRight: '20px' }}></i>
                        Continue With Google
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Account;