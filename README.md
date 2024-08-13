# Buyogo - Signup and Login System

## Project Overview

Buyogo is a multi-step signup and login system built using Angular 16. This project features a user authentication process with a step-by-step signup and login mechanism. The application integrates NgRx for state management and utilizes `json-server` to mock backend responses for development.

### Key Features:

1. **Login Screen:**
   - Users can log in with their email/phone number and password.
   - Upon clicking the Login button, the application validates the password and displays success or failure messages.

2. **Signup Screen:**
   - **Step 1:** Users enter their Name and Create a Password along with email/phone number.
   - **Step 2:** Users provide additional details:
     - Organization Name (must match an allowed ID from the mock data).
     - Designation (dropdown menu).
     - Birth Date (calendar picker).
     - City (text input).
     - Pincode (must be a 6-digit number).
   - The form includes navigation buttons to move between steps while preserving entered data.

## Installation and Setup

```bash
# Clone the Repository
git clone https://github.com/Sricharan666/solve8.git && cd solve8

# Install Dependencies
npm install

# Install json-server globally
npm install -g json-server

# Start json-server to serve mock data
json-server --watch db.json 

# Install NgRx version 16
npm install @ngrx/store@16 @ngrx/effects@16 @ngrx/entity@16 @ngrx/store-devtools@16

# Start the Angular Application
ng serve


