
import puter from '@heyputer/puter.js';

export const signIn = async () => {
    try {
        return await puter.auth.signIn();
    } catch (error) {
        console.error('Puter Sign-in Error:', error);
        return null;
    }
};

export const signOut = () => {
    puter.auth.signOut();
};

export const getCurrentUser = async () => {
    try {
        return await puter.auth.getUser();
    } catch (error) {
        console.error('Puter Get User Error:', error);
        return null;
    }
};
