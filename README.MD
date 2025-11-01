# Phonebook App

A full-stack phonebook application built with **React**, **Node.js**, **Express**, and **MongoDB**.  
It allows users to add, update, delete, and view contact details, all persisted in a MongoDB Atlas database.

**Live App:** [https://full-stack-open-lkjv.onrender.com/](https://full-stack-open-lkjv.onrender.com/)

---

## Features

- Add new contacts with name and number  
- Prevent duplicate entries (unique names)  
- Update existing contact numbers  
- Delete contacts  
- Display total entries and request time at `/info`  
- Connected to MongoDB Atlas using Mongoose  
- Deployed as a single full-stack app on Render  

---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas (via Mongoose)  
- **Deployment:** Render  

---

## API Endpoints

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/api/persons`     | Fetch all persons               |
| GET    | `/api/persons/:id` | Fetch a single person by ID     |
| POST   | `/api/persons`     | Add a new person                |
| PUT    | `/api/persons/:id` | Update an existing person       |
| DELETE | `/api/persons/:id` | Delete a person by ID           |
| GET    | `/info`            | Show count and current time     |

---


