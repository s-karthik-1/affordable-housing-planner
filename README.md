Housify: Affordable Housing Planner
Housify is a professional MERN stack application developed for the PlymHack 24-hour Hackathon. It empowers families to plan and budget their dream homes through a data-driven, phased construction approach.

The Problem
Many families struggle with construction because they lack a clear breakdown of material costs and a roadmap for building in stages. This leads to budget overruns and abandoned projects. Housify solves this by providing instant, professional estimations.

Key Features
User Authentication: Secure Signup/Login system using JWT and Bcrypt.

Dynamic Budgeter: Itemized breakdown of materials (Bricks, Cement, Sand) and labor costs based on user budget.

Location-Aware Advice: Strategic architectural suggestions tailored to the project's location.

Phased Roadmap: A 3-step construction timeline (Foundation, Superstructure, Finishing) to help manage cash flow.

Clean UI: A professional dashboard built with React and modern CSS.

Tech Stack
Frontend: React.js, Axios, CSS3

Backend: Node.js, Express.js

Database: MongoDB (NoSQL)

Security: JWT (JSON Web Tokens), Bcrypt.js

Installation & Setup
1. Prerequisites
Node.js (v18+)

MongoDB Compass/Server running on localhost:27017

2. Backend Setup
Bash
cd backend
npm install
node server.js
# Runs on http://localhost:5001
3. Frontend Setup
Bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000