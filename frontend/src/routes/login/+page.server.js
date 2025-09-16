
import { fetchAccessTokenCodeGrant, setTokenCookies } from '$lib/fetchTokens.server.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url, cookies }) => {
  const query = url.searchParams
  if (query.get('code') && query.get('state')) {
    // TODO: Check the state in here against a state cookie
    try {
      // TODO: this is not failing properly for an expired code value
      // eg http://localhost:5173/login?code=asdfasdf&state=asdfasdf fails bad
      const tokenData = await fetchAccessTokenCodeGrant(query.get('code'));
      console.log({ tokenData })
      setTokenCookies(cookies, tokenData);
      return { authorized: true }
    } catch (e) {
      console.log(e)
      throw e;
    }
  } else if (cookies.get('access_token')) {
    redirect(307, '/');
  }
}
