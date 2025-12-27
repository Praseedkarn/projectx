# Project X

An **AI-powered travel planner (Project X)** that generates personalized itineraries for trips across India (and beyond).  
Users can describe their trip (duration, location, preferences), and the AI creates a structured travel plan with activities, transport suggestions, and costs.

This project uses a **React frontend** and a **Node.js + Express backend** integrated with **OpenRouter AI (free model)**.

---

## 🚀 Features

- 🧠 AI-generated travel itineraries
- 🗺️ Supports short trips, weekend trips, and multi-day trips
- 🧳 Packing list support
- ⭐ Save and view itineraries
- 🔐 User sign-in (demo/local)
- ⚡ Fallback handling if AI response is not structured
- 📱 Responsive frontend UI

---

## 🏗️ Project Structure (Monorepo)

project-x/
│
├── frontend/ # React application
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── styles/
│ │ └── App.js
│ └── package.json
│
├── backend/ # Node.js + Express API
│ ├── routes/
│ ├── services/
│ ├── server.js
│ └── package.json
│
├── .gitignore
└── README.md



## 🧠 Tech Stack

### Frontend
- React (CRA)
- React Router
- Fetch API
- CSS (custom styles)

### Backend
- Node.js
- Express.js
- Axios
- OpenRouter AI (Free Model)
- dotenv & CORS

---

## 🔑 AI Integration

- AI Provider: **OpenRouter**
- Model Used:  
deepseek/deepseek-r1-0528:free


- AI is accessed **only from the backend** (API key is never exposed to frontend).

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/project-x-ai-travel-planner.git
cd project-x-ai-travel-planner
2️⃣ Backend Setup

cd backend
npm install
Create a .env file inside backend/:

env

AI_API_KEY=YOUR_OPENROUTER_API_KEY
PORT=5001
Start backend:

bash

npm start
Backend will run on:


http://localhost:5001
3️⃣ Frontend Setup

cd frontend
npm install
npm start
Frontend will run on:


http://localhost:3000
Proxy is already configured to connect frontend → backend.


🛡️ Security Notes
.env is ignored via .gitignore

API keys are stored only in backend

node_modules is never committed

📌 Current Status
✅ Frontend–backend integration complete

✅ AI responses working with free model

✅ GitHub-ready project structure

🔮 Future Enhancements
User authentication with backend

Database for saved itineraries

Premium AI models

Deployment (Render / Railway / Vercel)

Cost optimization & rate limiting

👨‍💻 Author
Praseed

⭐ If You Like This Project
Give it a ⭐ on GitHub — it motivates me to build more 🚀



## ✅ WHAT TO DO NEXT

1️⃣ Save this as `README.md` in **root folder**  
2️⃣ Run:
```bash
git add README.md
git commit -m "Add project README"
git push origin main