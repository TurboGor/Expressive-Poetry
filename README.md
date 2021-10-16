# Expressive Poetry!


## Contents
  1. [Contents](#contents)
  2. [Overview](#overview)
  3. [Frontend](#frontend)
  4. [Backend](#backend)
  5. [Testing](#testing)
  6. [Deployment](#deployment)

## Overview

This application implements a simple poetry sharing service using an Express web server and a React front end. It is implemented as an exercise in learning these technologies and is not intended to be a real web-facing service.

## Frontend

The react frontend for this project in located inside /client/ from the root folder

The front end web application will be written using React and supports the following functionality.

- The front page displays a list of poem previews showing the first few lines of each poem. The poems displayed are those that are most highly rated (most votes).

- Clicking on a poem title (or maybe on the poem or a button saying "read more...") navigates to a page for that poem showing the whole text of the poem, nicely formatted

- There is a link in the site navigation to a form to add a new poem, once the fields are completed and the user clicks submit, the form is sent to the backend, if all goes well, the new poem is shown on it's own page

- Each poem page has an upvote button to record votes for the poem, clicking the button sends a request to the API to add to the votes for the poem

- Poem texts are written using Markdown and when displayed on the page, the Markdown is interpreted to give a nice layout (eg. using the react-markdown package) (note that to create line breaks you end a line with two spaces, you could refer your users to https://www.markdownguide.org/basic-syntax/ for reference)

## Backend

The express backend api for this project in located inside /api/ from the root folder

The Express server implements a simple API for poetry sharing. It has the following endpoints:

- GET /api/poems - returns a list of poem records
- GET /api/poems/:id - returns the record for the poem with the given id
- POST /api/poems - adds a new poem to the collection, POST body is the poem JSON without the id or votes fields, response includes the new poem id
- POST /api/poems/:id - adds an upvote for the poem with the given id

Poems records have id, author, title, text and votes fields. id is a unique integer id; votes is an integer count of upvotes for the poem; the remaining fields are text.

Here is an example poem:
```
    {
      "id": 0,
      "title": "Campervan",
      "author": "Bob Bobalooba",
      "authorid": 0,
      "text": `__Lorem__ ipsum dolor sit amet,  
      consectetur adipiscing elit,  
      sed do eiusmod tempor incididunt ut 
      labore et dolore magna aliqua.  `,
      "votes": 3
    },
```

## Testing

First of all, to start the front end, navigate to the ```./client``` folder then type ```npm start``` this should start the frontend in browser. However the website cannot function without a connected backend and to make changes to the backend locally we need to have a local backend instance.

In order to test the express backend with the frontend locally, ```http://localhost:3001``` can be replaced for each fetch() request

For example:
```
await fetch('http://localhost:3001/api/poems', { headers })
```

Now we can start the backend API by using the command ```node server.js``` inside the ```./server``` folder

## Deployment
This project is deployed to heroku.

During the deployment process I found that the easiest solution to hosting the server and connecting the frontend would be to create the backend first and host it, then replace the localhost with my backend URL in the frontend API requests.

The frontend is hosted here: https://expressive-poetry.herokuapp.com/

The backend is hosted here: https://expressive-poetry-api.herokuapp.com/
