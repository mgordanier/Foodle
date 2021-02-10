## Foodle

Foodle is a mobile-friendly, accessible web application where you can efficiently coordinate and choose a restaurant with your friends in New York City. An organizer can create the event, share a link with others and have friends vote on a restaurant poll based on location and food preferences. A piechart is rendered visually to tally all the responses for that event. Made specifically for indecisive foodlers!

Watch our demo <a href="https://www.youtube.com/watch?v=vT_FW_NRI8g&t=1s">here</a>!

## Website

<a href="https://foodle-app.herokuapp.com/">https://foodle-app.herokuapp.com/</a>

<img src="https://user-images.githubusercontent.com/62160389/88232866-9ea9ec00-cc44-11ea-8806-dce3b8826013.png" height="40%" width="40%"> <img src="https://user-images.githubusercontent.com/62160389/88232690-4ecb2500-cc44-11ea-9abb-40e8e0493092.png" height="40%" width="40%">

## Technical Stack

<li>Front-End: React, Redux, Bulma, Sass</li>
<li>Back-End: PostgresQL, Express, Sequelize</li>
<li>Libraries: D3, Socket.io</li>
<li>Integrations: Google Place API</li>

## Contributors

<li><a href="https://github.com/jenyang929">@jenniferyang</a></li>
<li><a href="https://github.com/mgordanier">@marygordanier</a></li>
<li><a href="https://github.com/lillyoh">@lillyoh</a></li>
<li><a href="https://github.com/Palolo0413">@yanggu</a></li>

## Prerequisites

If you would like to install locally to try it out or make modifications,

please <strong>Fork</strong> and <strong>Clone</strong> this repository

Then install the dependencies:

```
npm install
```

Create a postgreSQL database:

```
createdb foodle
```

Create a file called `secrets.js` in the project root

- This file is listed in `.gitignore` to keep your secret API keys from getting pushed to Github
- It will only be required in the development environment
- Its purpose is to attach the environment variables that you will use to run the project locally.
- You will need to provide your own Google API key (for restaurant suggestions) and details for Google OAuth
- It might look something like this:

```
process.env.GOOGLE_API_KEY = 'an API key to access Google Places'
process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'a secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

To start your server:

```
npm run start-dev
```

Then go to <a href="http://localhost:8080">http://localhost:8080/</a> and start voting!

## Special Thanks

Great boilerplate template used from <a href="https://github.com/FullstackAcademy/boilermaker">Fullstack Academy Boilermaker</a>
