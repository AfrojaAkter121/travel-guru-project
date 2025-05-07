import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';


export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading ] = useState(true)
console.log(user)

    // sign in
    const signUp = (email , password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // login
    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    // logout
    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=> {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unSubscribe()
        }
    })

    const userInfo = {
        user,
        setUser,
        signUp,
        logIn,
        logOut,
        setLoading,
        loading
    }
    return (
            <AuthContext value={userInfo}>
                {children}
            </AuthContext>
    );
};

export default AuthProvider;