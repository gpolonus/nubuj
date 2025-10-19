# Nubuj Next.js

## Implementation Plan

- [x] Start with the Shadcn + Next.js template
- [o] Integrate Supabase
  - [ ] Have a form send data to a purchases table
- [ ] Auth the app
  - [ ] FE form for signing in if they aren't signed in (or whatever this needs to be)
  - [ ] table policies
- [ ] Display the purchases in a FE table
  - [ ] filters
  - [ ] sorts
  - [ ] etc
- [ ] CHARTS
  - idk what the requirements for this even are
- [ ] user management stuff
  - avatar image upload to Vercel blob storage, or maybe supabase has something for this
  - name change?
  - etc

## Questions

- What am I gonna use for charts?
    - shadcn has got this included
- Why nextjs?
  - Don't really need global state all that much
  - more shadcn examples will be available
  - good opportunity to refresh my memory of how nextjs works now
- Might be good to have data stores anyway for user data
  - let's use zustand
- How do I connect users to their data? Do they have an ID of some kind?
  - probably?
  - seems like it will be [largely automagical](https://supabase.com/docs/guides/auth)
- What will I use for the menu?
  - The drawer component can come in from the side
- How does supabase know that the user is signed in?
  - Based on the docs, it sounds like all API requests made through the SDK have the token data included, via cookies or maybe some kind of session record. There for sure will be docs for how to handle this
    - [found here](https://supabase.com/docs/guides/auth/server-side/nextjs?router=pages)
  - You can start with all their code and then add shadcn components to it once it's working
- Shadcn has form elements
- How will autocomplete work for the transaction location?
  - combobox
  - probs don't even need fuzzysort for this, would be cool though
- Do transactions need names? Maybe a note field instead?
  - note field seems more correct
- [ ] How do I use this fucking thing? [AI Elements](https://ai-sdk.dev/elements/overview)
- [ ] What is so good about the [commerce template](https://github.com/vercel/commerce) that makes them suggest it for the interview?
  - How does this thing leverage different rendering patterns?
  - How the hell do I use thing fucking thing? [useOptimistic](https://react.dev/reference/react/useOptimistic)
- [ ] What are the different rendering patterns in Next.js? And how do I integrate them into my app?
- [ ] How do I use this fucking thing? [mcp-handler](https://github.com/vercel/mcp-handler)
- [ ] Would HSTS be useful to add?

## Shadcn Integration

https://v0.app/templates/next-js-shadcn-ui-ujvXoiAFlxG


## Charts

- How could the user be given the ability to create their own charts?
  - this could nicely extend from how the API works already
  - They could maybe be given a form for creating new charts
  - could maybe bring in a dragndrop library for making a lil tableau clone
  - could give scale and grouping functionality as well as filtering


## Vercel Capabilities

- Went to the marketplace for integration information
- Easy connection to github
- easy connection to subdomain
- super easy deployment upon merge
- super easy connection of database secrets


## AI capabilities

- does this project need it? Does this interview need it?


### Requirements of the Demo

- An application built with Next and deployed on Vercel
- use as many Vercel/Next features as needed to aid your demo
- Put particular focus on front-end performance, using appropriate Next.js rendering strategies, while also demonstrating your technical strengths.
- Explanations of:
  - A brief introduction to your application
  - The technologies you chose for your project and why
  - The Vercel specific differentiators & How developing and deploying projects with your chosen tech stack differs from other platforms