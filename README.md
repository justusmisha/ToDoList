# TODO List. Flask, React

## Project Setup

This project includes a **Flask backend** and a **React frontend**, with **SQLite** as the database. Follow these steps to get everything running.

## Prerequisites

- **Python 3.x**, **Node.js**, **npm**, and **SQLite** should be installed.

## Setup

### Backend (Flask)
1. Navigate to the `app/backend` directory.
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # Mac/Linux
   .\venv\Scripts\activate  # Windows
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask app:
   ```bash
   python run.py
   ```
   The backend will run on `http://localhost:5000`.

### Frontend (React)
1. Navigate to the `app/frontend` directory.
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## Running the Project
---
Make sure both the **Flask backend** and **React frontend** are running. The Flask app handles API requests, and the React app communicates with it.

