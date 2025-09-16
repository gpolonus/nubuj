
const drupalUrl = import.meta.env.VITE_DRUPAL_SERVER_PATH

export const drupalClient = {
  async get(path, params) {
    return await fetch(`${drupalUrl}${path}?${new URLSearchParams(params)}`)
      .then(res => res.json());
  },

  async post(path, bodyData) {
    return await fetch(
      `${drupalUrl}${path}`,
      {
        method: 'POST',
        body: new URLSearchParams(bodyData)
      })
      .then(res => res.json());
  },

  fetchOauthToken(data) {
    return this.post('/oauth/token', data)
  }
}

// TODO: turn the PKCE into a cookie so the BE can check it
export const generateAuthLink = () => {
  localStorage.setItem('state', Date.now());

  const params = new URLSearchParams();
  params.set('response_type', 'code');
  params.set('client_id', import.meta.env.VITE_CLIENT_ID);
  params.set('redirect_uri', import.meta.env.VITE_REDIRECT_URI);
  params.set('scope', 'user');
  params.set('state', localStorage.getItem('state'));

  return `${drupalUrl}${'/oauth/authorize'}?${params}`
}
