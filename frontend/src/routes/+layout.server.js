import { fetchAccessTokenRefreshGrant, setTokenCookies } from '$lib/fetchTokens.server.js';
import { redirect } from '@sveltejs/kit'

export const load = async ({ url, cookies }) => {
  let authorized = false;
  const query = url.searchParams
  console.log(cookies.get('access_token'))
  if (!cookies.get('access_token')) {
    if (cookies.get('refresh_token')) {
      const tokenData = await fetchAccessTokenRefreshGrant(cookies.get('refresh_token'));
      setTokenCookies(cookies, tokenData);
      authorized = true;

    } else if (url.pathname !== '/login') {
      // If there is no refresh token, and you are not on the login page
      redirect(307, '/login');
    }
  } else {
    authorized = true;
  }

  return { authorized };
}
