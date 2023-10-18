import { refreshAccessToken } from './authSlice';

const tokenRefreshMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    // Your logic to determine when to refresh the token
    const { auth } = getState();

    // Check if the access token is expired
    // if (shouldRefreshToken(auth.token)) {
    //     // Dispatch the refresh token action
    //     const refreshToken = auth.refreshToken; // Replace with your actual refreshToken
    //     dispatch(refreshAccessToken(refreshToken));
    // }

    return next(action);
};

export default tokenRefreshMiddleware;
