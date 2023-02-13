# Basketball Court Finder
---

## Overview
---
For all those would-be ballers out there, this app finds basketball courts in your area and provides you with a wealth of relevant information about the court (surface, number of hoops, hours available, etc.) as well as view other users reviews of the court.

---
## User Stories
---
As a user, I would like to be able to:
- Create an Account
- Login/logout of my account
- Retrieve forgotten password/email
- Search for basketball court (rim, surface, lights, number of hoops)
- View details about the basketball court
- filter basketball by certain characteristic
- add details about the basketball court (update), when logged in
- rate and review courts (post reviews), when logged in
- add new basketball court
- Report court as closed
- Token Authentication

### Stretch Goals
- Add friends
- Share my location with friends
- Find acourt that is the optimal distance from multiple locations
- Use current location data
---
## Wireframes
---
![Home Screen](wireframe/home.PNG)

---
![Nearby Courts (Index)](wireframe/near-by-court.PNG)

---
![Court details (Show)](wireframe/court-details.PNG)

---
![Add court](wireframe/create-court.PNG)

---

## ERDs
---

---

## Route Tables
---

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/court`             | `courts#index`    |
| GET   | `/court/:id`             | `courts#show`    |
| POST   | `/court`             | `courts#create`    |
| PATCH  | `/court/:id` | `courts#update`  |

### Users

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

### Reviews

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/reviews/:courtId`             | `reviews#create`    |
| PATCH  | `/reviews/:courtId/:reviewId` | `reviews#update`  |
| DELETE | `/reviews/:courtId/:reviewId`        | `reviews#delete`   |
