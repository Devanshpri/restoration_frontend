// @flow
import { Cookies } from 'react-cookie';

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
		const user = getLoggedInUser();
    if (!user?.ok) {
        return false;
    }
    return true
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};

export { isUserAuthenticated, getLoggedInUser };
