# 🌍 Project X — AI Travel Planner

![React](https://img.shields.io/badge/React-18-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8)
![Node](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-darkgreen)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black)
![Render](https://img.shields.io/badge/Backend-Render-purple)
![AI](https://img.shields.io/badge/AI-Groq%20(LLaMA%203.1)-orange)

**Project X** is a full-stack **AI-powered travel planning platform** that generates reliable, structured itineraries using prompt engineering, real-world data, and a token-based AI system.

🔗 **Live App:** https://projectx-one-pearl.vercel.app  
🔗 **Backend API:** Deployed on Render

---

## ✨ Features

- 🤖 AI-generated travel itineraries (Hourly, 1-Day, Multi-Day)
- 🧠 Prompt-engineered outputs (stable & predictable)
- 🌍 City explorer with **Wikipedia + AI fallback**
- 📅 Google Calendar export
- 🔄 Drag & reorder trip days
- 🔐 Authentication (JWT)
- 🪙 Token-based AI usage + history
- 📱 Fully responsive (mobile-friendly)
- 🧑‍💼 Admin dashboard

---

## 🧠 How AI Works

1. **User Input**
   - User selects destination, duration, group type, and preferences.

2. **Prompt Builder**
   - Inputs are converted into strict, rule-based prompts  
   - Different prompts for **Hourly / One-Day / Multi-Day** trips.

3. **AI Generation**
   - Requests are sent to **Groq (LLaMA 3.1)** with controlled tokens and temperature.
   - AI is forced to follow a fixed format (no randomness).

4. **Structured Parsing**
   - AI text is converted into clean JSON.
   - Invalid or broken responses are rejected automatically.

5. **Fallback Safety**
   - City info → Wikipedia first  
   - If Wiki fails → AI generates reliable backup content.

6. **Final Output**
   - Data is rendered into timelines, cards, sliders, and calendars.
   - Result is editable, exportable, and mobile-friendly.

## 🔄 AI Workflow (Overview)

User Input
   ↓
Prompt Builder
   (Hourly / One-Day / Multi-Day)
   ↓
Groq AI (LLaMA 3.1)
   ↓
Structured Text Response
   ↓
Parser → JSON Validation
   ↓
┌───────────────┬────────────────┐
│               │                │
City Info       Itinerary Data
│               │
Wikipedia API   Timeline / Cards
│               │
AI Fallback     Drag · Edit · Export
│
Final UI Output



## 🛠 Tech Stack

**Frontend**
- React
- Tailwind CSS
- Deployed on Vercel

**Backend**
- Node.js
- Express
- MongoDB
- Deployed on Render

**AI & APIs**
- Groq (LLaMA 3.1)
- Wikipedia API
- OpenStreetMap (OSM)

---

## 🚀 Status

✅ Live  
🚧 Actively improving  
📈 Built with scalability in mind

---

## 📬 Contact

Built by **Praseed Kumar**  
Feel free to explore, fork, or contribute.