
# CodeAlpha E-commerce Store
A full-stack e-commerce application built for the CodeAlpha internship.

## Features
- Product listings with details
- Shopping cart with add/remove items
- Order processing
- User registration and login

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Django, Django REST Framework
- Database: PostgreSQL

## Setup
### Backend
1. Install dependencies: `pip install django djangorestframework django-cors-headers psycopg2-binary`
2. Setup PostgreSQL database: `CREATE DATABASE ecommerce_db;`
3. Update `ecommerce/settings.py` with database credentials
4. Run migrations: `python manage.py makemigrations && python manage.py migrate`
5. Add sample products via Django shell
6. Run server: `python manage.py runserver`

### Frontend
1. Save `index.html` and open in a browser
2. Ensure backend is running at `http://localhost:8000`

## Demo
[Link to LinkedIn video]
