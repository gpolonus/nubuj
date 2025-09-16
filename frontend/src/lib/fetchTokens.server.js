import { drupalClient } from "$lib";


export const getClientSecret = () => {
  return import.meta.env.VITE_CLIENT_SECRET;
}

export const fetchAccessTokenCodeGrant = async (code) => {
  const secret = getClientSecret();
  const bodyData = {
    grant_type: 'authorization_code',
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: secret,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    code
  }

  return await drupalClient.fetchOauthToken(bodyData);
}

export const fetchAccessTokenRefreshGrant = async (refreshToken) => {
  const secret = getClientSecret();
  const bodyData = {
    grant_type: 'refresh_token',
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: secret,
    refresh_token: refreshToken,
  };

  return await drupalClient.fetchOauthToken(bodyData);
}

export const setTokenCookies = (cookies, { expires_in, access_token, refresh_token }) => {
  const expires = 1 * expires_in;
  console.log({ expires_in })
  console.log(new Date(Date.now() + (expires_in - 10) * 1000))
  cookies.set('access_token', access_token, { path: '/', expires: new Date(Date.now() + (expires_in - 10) * 1000) });
  cookies.set('refresh_token', refresh_token, { path: '/' });
}
