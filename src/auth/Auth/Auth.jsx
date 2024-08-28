import React, { useState } from 'react';
import supabase from "../../config/supabaseClient";

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle email sign-up
    const signUpWithEmail = async () => {
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            console.error('Error signing up:', error);
        } else {
            console.log('User signed up:', user);
        }
    };

    // Handle email sign-in
    const signInWithEmail = async () => {
        const { user, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error('Error signing in:', error);
        } else {
            console.log('User signed in:', user);
        }
    };

    // Handle Google sign-in
    const signInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) {
            console.error('Error during Google sign-in:', error);
        } else {
            console.log('Redirecting to Google for authentication...');
        }
    };

    return (
        <div>
            <h2>Sign In / Sign Up</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>
                <button onClick={signUpWithEmail}>Sign Up with Email</button>
                <button onClick={signInWithEmail}>Sign In with Email</button>
            </div>
            <hr />
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    );
};
