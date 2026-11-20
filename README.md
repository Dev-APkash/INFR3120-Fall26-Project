# StudySpot

A web app that helps college students find, create and manage study sessions with their classmates.

**Live site:** https://studyspot-vk26.onrender.com

> Hosted on Render's free tier, so the first visit after a while may take 30–60 seconds while the server wakes up.

## Features (Project Part 1)

- Landing page with the StudySpot name and our team logo
- "Create a Study Session" hero button and form
- Table of all study sessions on the landing page, sorted by date
- Edit and delete for each session
- Data stored in MongoDB Atlas

## Tech stack

- Node.js + Express (scaffolded with express-generator)
- EJS views
- MongoDB Atlas + Mongoose
- dotenv for the database connection string
- Deployed on Render

## Run locally

1. Clone the repo and install packages:

   ```
   git clone https://github.com/Dev-APkash/INFR3120-Fall26-Project.git
   cd INFR3120-Fall26-Project
   npm install
   ```

2. Create a `.env` file in the project root (see `.env.example`):

   ```
   MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/studyspot
   ```

3. Start the app and open http://localhost:3000:

   ```
   npm start
   ```

## Project structure

| Path | What it does |
| --- | --- |
| `app.js` | Express setup, MongoDB connection, error handling |
| `models/studySession.js` | Mongoose schema for a study session |
| `routes/index.js` | Routes for list, create, edit and delete |
| `views/` | EJS pages (`index`, `create`, `edit`, `error`) and the shared header/footer |
| `public/` | Stylesheet and team logo |
| `docs/Project-Plan.docx` | Project idea and group contribution table |

## Team

| Member | Part 1 work |
| --- | --- |
| Aarush | Repo setup, Express + EJS scaffold, MongoDB connection and model, logo, landing page, Create feature |
| Avanish | Sessions table, Edit and Delete, styling, Render deployment, README |

## Citations

- Project scaffold generated with [express-generator](https://expressjs.com/en/starter/generator.html) (Express.js team).
- All other code was written by our team or adapted from INFR3120 lecture code.
