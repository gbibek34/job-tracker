# Job Application Tracker

A modern web application to help you organize, track, and manage your job applications efficiently.

## Tech Stack

- **Frontend:** [React](https://react.dev/)
- **Backend:** [FastAPI](https://fastapi.tiangolo.com/)
- **Database:** [PostgreSQL (Supabase)](https://supabase.com/)

## Features

- Add, edit, and delete job applications
- Track application status and progress
- Organize applications by company, role, and date
- Notes and reminders for each application
- Responsive and user-friendly interface

## Getting Started

### Prerequisites

- Node.js & npm (for frontend)
- Python 3.8+ (for backend)
- PostgreSQL database (managed by Supabase or self-hosted)

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/your-username/job-application-tracker.git
cd job-application-tracker
```

#### 2. Set up the backend

```sh
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r [requirements.txt](http://_vscodecontentref_/0)
uvicorn main:app --reload
```

#### 3. Set up the frontend

```sh
cd client
npm install
npm start
```

#### 4. Configure the database

- Set up a PostgreSQL database (we recommend Supabase)
- Update your backend configuration with your database credentials

Happy tracking!
