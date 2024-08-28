import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from "../../config/supabaseClient";

export const AuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthRedirect = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error handling redirect:', error);
            } else {
                console.log('User is authenticated:', data.session.user);
                navigate('/dashboard'); // Redirect to your desired page after authentication
            }
        };

        handleAuthRedirect();
    }, [navigate]);

    return <div>Loading...</div>;
};