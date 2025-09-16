# NUBUJ

A budget tracking app for me to lump all my purchases into very few categories

## Current TODOs

- [ ] User auth
    - Looks like there's three options
        - Cookie auth
            - passing the cookies through Sveltekit's application server layer seems convoluted, and there doesn't seem to be a good way to log in like normal but in a decoupled context. Plus there's domain weirdness there too
        - OAuth 2.0
            - Less secure than JWT and I'm not convinced that it's possible to sign in as a specific user. OAuth seems more suited to having API consumers rather than users
            - it is possible to sign in as a specific user, and this method is the easiest to configure
            - the password grant is going away at some point, but NOT SOON SO WE'RE GONNA USE IT FUCK YEAH
                - oh JK it's gone from v6 of the simple_oauth module. Back to the Authorization Grant it is
        - JWT
            - This seems like the way to go. [Tut here](https://www.drupal.org/docs/contributed-modules/api-authentication/jwt-authentication)
            - this would be cool to do, but the JWT module isn't updated for D11
- [ ] After the auth method is configured, gotta build a lil login form on the FE
    - the lil login form IS DRUPAL (boooooooooom)
- [ ] display listing of user transactions
- [ ] Gitlab CI/CD for deploying to a VPS
    - get a new VPS? yeah, probs
        - https://www.kkyri.com/p/how-to-secure-your-new-vps-a-step-by-step-guide
    - downgrade my main one so that my costs for 2 don't increase
    - https://docs.gitlab.com/runner/
- [ ] create views and user flows
- [ ] create Drupal theme so the lil login form
- [ ] set up drush aliases for local and prod
- [ ] set up DB backups to S3
- [ ] user self-registration

## Login Flow

### Case: Not Logged in before
1. BE sees lack of token
2. Sent to login screen
3. user clicks on button
4. user sent to Drupal
5. logs in
6. confirms
7. sent back to nubuj w/ code
8. BE fetches tokens and passes them to FE
9. FE then
    1. saves the tokens as cookies and
    2. redirects away from the `?code` query parameter and to the actual front page

### Case: Has logged in before and doesn't have token cookies
Basically the same as above

### Case: Has token cookies and the access token has expired
1. BE sees the token is expired and requests a new one via the refresh token grant
2. Send the new tokens to the FE

### Case: Has token cookies and the access token hasn't expired
Business as usual

## FUTURE TODOS

Let the user create their own transaction types

