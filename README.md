# Email Recognition & Checkout System

## Project Overview

This project is a full-stack web application built using React and Django REST Framework.

The application allows users to register, receive a unique login code, verify their identity during checkout, and complete the checkout process securely.

---

## Tech Stack

### Frontend
- React.js
- Axios
- Bootstrap

### Backend
- Python
- Django
- Django REST Framework

### Database
- SQLite

---

## Features

### User Registration
- Register with First Name, Last Name, and Email.
- Generates a unique Login Code.
- Stores user information in the database.

### Email Recognition
- Validates email format.
- Detects registered users automatically.
- Triggers a verification popup for recognized users.

### Login Verification
- User enters Login Code.
- Backend verifies the code.
- Displays a welcome message upon successful verification.

### Checkout
- Phone Number validation.
- Shipping Address validation.
- Creates checkout record linked to the user.
- Returns success message after checkout completion.

---

## Application Flow

1. User registers with their details.
2. A unique Login Code is generated.
3. User navigates to the Checkout page.
4. User enters a registered email.
5. System recognizes the email and displays a verification popup.
6. User enters the Login Code.
7. Upon successful verification, the checkout form is displayed.
8. User enters Phone Number and Shipping Address.
9. Checkout is completed successfully.

---

## API Endpoints

### Register User

```http
POST /api/register/
```

Request:

```json
{
  "first_name": "Rithika",
  "last_name": "R",
  "email": "rithika@gmail.com"
}
```

---

### Check Email

```http
POST /api/check-email/
```

Request:

```json
{
  "email": "rithika@gmail.com"
}
```

---

### Verify Login Code

```http
POST /api/verify-code/
```

Request:

```json
{
  "email": "rithika@gmail.com",
  "login_code": "123456"
}
```

---

### Checkout

```http
POST /api/checkout/
```

Request:

```json
{
  "email": "rithika@gmail.com",
  "phone": "9876543210",
  "shipping_address": "Bangalore, Karnataka"
}
```

---

## Database Structure

### User Table

| Field | Type |
|---------|---------|
| id | Integer |
| first_name | String |
| last_name | String |
| email | Email |
| login_code | String |
| created_at | DateTime |

### Checkout Table

| Field | Type |
|---------|---------|
| id | Integer |
| user | Foreign Key |
| phone | String |
| shipping_address | Text |
| created_at | DateTime |

---

## Backend Setup

```bash
pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py runserver
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Validation Implemented

### Email Validation
- Valid email format required.

### Phone Validation
- Must contain only digits.
- Must be exactly 10 digits.

### Shipping Address Validation
- Minimum address length validation.

### Login Code Validation
- Login code must match the registered user.

---

## Repository Structure

```text
OTP_LOGIN_APP/
│
├── frontend/
├── users/
├── checkout/
├── OTP_LOGIN_APP/
│
├── manage.py
├── requirements.txt
├── README.md
├── prompts.md
└── db.sqlite3
```

---

## Notes

This project was developed as part of the Bolt take-home assignment.

The application demonstrates:
- Email recognition
- Login code verification
- Checkout workflow
- Frontend, API, and database separation