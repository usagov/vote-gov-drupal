# Vote.gov Storybook component library

Vote.gov uses the U.S. Web Design System (USWDS) as the foundation for the component library. USWDS web components can be found here:  
https://designsystem.digital.gov/components/overview/

In this library we have included customized components that were uniquely developed for vote.gov.

1. Double deck card
2. Feature cards
3. Hero
4. Image + Text CTA
5. Quicklinks

## Installation requirements

Node: https://nodejs.org/en/  
NVM: https://github.com/nvm-sh/nvm

## Developer documentation
[Storybook docs](https://storybook.js.org/docs)

## Getting started

### Installing the node package dependencies and launching the app
```
# Install dependencies
nvm use
npm install
```
```
# Launch the app
npm start
```

## Known issue
- Relative CSS assets are not loading in storybook preview (USWDS fonts/icons)
