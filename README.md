# Project X — AI Travel Planner

Planning a trip sounds exciting… until it becomes overwhelming.

Searching blogs, watching videos, checking maps, calculating time, thinking about budget — and still ending up with an unrealistic plan.
Project X was built to fix exactly that.

Project X is an AI-powered travel planning platform that helps you create realistic, time-aware travel itineraries — whether you have just a few hours, one day, or multiple days in a destination.

This project focuses on practical travel, not just pretty plans.

# Why Project X?

Most travel planners:

Give generic suggestions

Ignore time constraints

Overpack activities

Don’t adapt to how you actually travel

Project X does the opposite.

It plans trips the way a real traveler would — slow, balanced, budget-aware, and flexible.

# What Can You Do With Project X?
# AI Travel Planning

Generate itineraries for:

Few hours

One day

Multiple days

Plans are customized using:

Travel group (solo, couple, family, friends)

Budget & pace

Personal preferences (cafes, photography, avoid crowds, etc.)

AI prompts are designed to:

Limit overcrowding

Reduce unrealistic travel

Keep days relaxed and achievable

# Explore Cities

Browse a curated list of cities from around the world

Open detailed city pages powered by MongoDB

Each city includes:

Best time to visit

Neighborhoods to explore

Things to do

Nearby cities

Travel facts & tips

This helps travelers understand a place before planning it.

# Distance Calculator

Calculate distance between two cities

Useful for multi-city or road trip planning

# Smart Packing List

Simple and practical packing checklist

Designed for real travel situations

# Save Your Trips

Save AI-generated itineraries

Revisit and reuse past plans anytime

# Travel Blogs

Read curated travel blogs

Admin panel for managing blog content

# User Accounts

Sign in & stay logged in

Profile page with saved itineraries

Clean session handling

# Tech Stack

Frontend

React

Tailwind CSS

Component-based UI

State-driven navigation

Backend

Node.js

Express

REST APIs

AI integration

Database

MongoDB

Stores:

City details

Blogs

Users

(Future-ready) itineraries

# How the App Works (High Level)

User enters travel preferences

AI generates a realistic itinerary

User can save, revisit, or refine the plan

Cities can be explored independently

Everything is connected in one platform

The app is designed so features work together, not separately.

# Architecture Overview
Frontend (React + Tailwind)
        |
        |── AI Trip Planner UI
        |── Explore Cities
        |── Blogs & Profile
        |
Backend (Node + Express)
        |
        |── AI Service
        |── City APIs
        |── Auth APIs
        |
MongoDB
        |
        |── Cities
        |── Blogs
        |── Users

# Current Navigation Style

Central state-based navigation in App.js

Smooth transitions between sections

Designed to be upgraded to React Router in future

 Planned Improvements

URL-based routing (React Router)

Map & timeline visualization

“Refine itinerary” with AI (cheaper, slower, luxury)

City → Trip auto-fill

Public sharing of itineraries

 Purpose of This Project

This project was built to:

Learn full-stack development

Understand AI integration in real products

Design a practical, user-focused application

Serve as a portfolio-ready project, not a demo

 Author

Praseed Kumar