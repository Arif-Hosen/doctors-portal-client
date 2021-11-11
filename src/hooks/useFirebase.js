import initializeFirebase from '../Pages/Login/Firebase/firebase.init';
import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";

// intialize firebase app
initializeFirebase();


const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // register/create  user with email and password
    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // error clear
                setAuthError('');
                const newUser = { email, displayName: name }
                setUser(newUser);
                // save user to databse
                saveUser(email, name, 'POST')
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                }).catch((error) => {

                });

                // push replace both are same
                history.replace('/');
            })
            .catch((error) => {
                // if have a error, set a state
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    // login user with email & password
    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // after successfully login, redirect user to the page they wanted to go
                const destination = location?.state?.from || '/';
                // we can use push instead of replace
                history.replace(destination);

                // error clear
                setAuthError('');
            })
            .catch((error) => {
                // if have a error, set a state
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //  signIn with google 
    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT');

                // after successfully login, redirect user to the page they wanted to go
                const destination = location?.state?.from || '/';
                // we can use push instead of replace
                history.replace(destination);

                // previous error clear
                setAuthError('');

            }).catch((error) => {
                // if have a error, set a state
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //  observer of user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // console.log(user);
            // if user remain set user in state
            if (user) {
                setUser(user);

            }
            //  if not set user state is empty
            else {
                setUser({})
            }
            setIsLoading(false)

        });
        return () => unsubscribe;
    }, [])

    // admin check
    useEffect(() => {
        fetch(`http://localhost:5000/user/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin)

            })

    }, [user.email])


    // logout of email password authentication
    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    // save user to database
    const saveUser = (email, displayName, method) => {
        // object property and its variable of value is same
        const user = { email, displayName };
        // console.log('test', user);
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        isLoading,
        admin,
        authError,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOut
    }
}

export default useFirebase;