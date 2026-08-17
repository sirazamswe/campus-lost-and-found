# Campus Lost & Found

<p align="center">
  <strong>A Smart Digital Platform for Recovering Lost Items on Campus</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-In%20Development-yellow" alt="Project Status">
  <img src="https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJavaScript-orange" alt="Frontend">
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green" alt="Backend">
  <img src="https://img.shields.io/badge/Database-MySQL-blue" alt="Database">
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## Overview

**Campus Lost & Found** is a web-based platform designed to make it easier for university students to **report, discover, and recover lost belongings**.

Instead of relying on campus notice boards, social media posts, or word of mouth, students can use one centralized platform to report lost or found items and search through existing reports.

The system connects people who have **lost an item** with those who have **found an item**, while keeping the process organized, searchable, and secure.

---

## Problem

Students frequently lose important belongings such as:

* Student IDs
* Wallets
* Keys
* Calculators
* Books
* USB drives
* Chargers
* Earphones
* Bags
* Other personal items

Traditional methods of recovering these items are inefficient because information is scattered across social media groups, messaging apps, campus notice boards, and personal networks.

### Our Solution

Campus Lost & Found provides a **centralized digital system** where users can:

1. Report a lost item.
2. Report a found item.
3. Search and filter existing reports.
4. View item details.
5. Identify potential matches.
6. Contact the relevant person securely.
7. Update the status after an item has been recovered.

---

## Key Features

### User Authentication

Users can create accounts and securely access the platform.

### Lost Item Reports

Users can submit detailed reports containing information such as:

* Item name
* Category
* Description
* Date
* Location
* Image
* Current status

### Found Item Reports

Users can report items they have found and provide enough information for the owner to identify them.

### Smart Search

Users can search through reports using relevant information such as item name, category, location, and status.

### Filtering

Reports can be filtered to quickly narrow down relevant results.

### Item Matching

The system can identify potential relationships between lost and found reports based on available item information.

### Secure Contact

Users can communicate with the relevant reporter without unnecessarily exposing private contact information publicly.

### Report Management

Users can manage their submitted reports and update their status when an item is successfully recovered.

---

## User Flow

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Login / Register │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Dashboard    │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌───────────┐  ┌───────────┐  ┌───────────┐
        │ Report    │  │  Search   │  │ My Reports│
        │ Lost/Found│  │   Items   │  │           │
        └─────┬─────┘  └─────┬─────┘  └───────────┘
              │              │
              └──────┬───────┘
                     ▼
             ┌───────────────┐
             │ Potential Match│
             └───────┬───────┘
                     │
                     ▼
             ┌───────────────┐
             │ Contact User  │
             └───────┬───────┘
                     │
                     ▼
             ┌───────────────┐
             │ Item Recovered│
             └───────────────┘
```

---

## Technology Stack

| Layer             | Technology              |
| ----------------- | ----------------------- |
| Frontend          | HTML5, CSS3, JavaScript |
| Backend           | Node.js                 |
| Web Framework     | Express.js              |
| Database          | MySQL                   |
| API Communication | REST API                |
| Version Control   | Git & GitHub            |
| Development       | Visual Studio Code      |

---

## System Architecture

The application follows a layered architecture:

```text
┌─────────────────────────────────────┐
│             CLIENT LAYER            │
│        HTML • CSS • JavaScript      │
└──────────────────┬──────────────────┘
                   │
                   │ HTTP / REST API
                   ▼
┌─────────────────────────────────────┐
│           APPLICATION LAYER         │
│        Node.js • Express.js         │
│                                     │
│  Authentication • Validation        │
│  Business Logic • API Routes        │
└──────────────────┬──────────────────┘
                   │
                   │ SQL Queries
                   ▼
┌─────────────────────────────────────┐
│              DATA LAYER             │
│                MySQL                │
│                                     │
│ Users • Reports • Items • Categories│
└─────────────────────────────────────┘
```

---

## Database

The application uses **MySQL** as its relational database.

Core entities include:

```text
Users
  │
  ├───────────┐
  │           │
  ▼           ▼
Lost Items   Found Items
  │           │
  └─────┬─────┘
        ▼
     Matches
        │
        ▼
    Contact
```

The database stores structured information about users, lost items, found items, categories, locations, and report status.

---

## Project Structure

```text
Campus-Lost-and-Found/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── report.html
│   ├── items.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── config/
│
├── database/
│   └── database.sql
│
├── package.json
├── .gitignore
└── README.md
```

> Folder names may vary depending on the final implementation.

---

# Installation

## Prerequisites

Make sure the following are installed:

* [Node.js](https://nodejs.org/)
* MySQL
* Git
* Visual Studio Code

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/campus-lost-and-found.git
```

Move into the project directory:

```bash
cd campus-lost-and-found
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure MySQL

Create a MySQL database for the project.

Example:

```sql
CREATE DATABASE campus_lost_found;
```

Import the provided database schema:

```text
database/database.sql
```

Then configure the database credentials in the backend.

Example:

```text
HOST=localhost
USER=root
PASSWORD=your_password
DATABASE=campus_lost_found
PORT=5000
```

---

## 4. Start the Server

```bash
node server.js
```

For development, if `nodemon` is configured:

```bash
npm run dev
```

The server should now be running locally.

---

# API Overview

The backend exposes RESTful API endpoints for communication between the frontend and database.

### Authentication

```text
POST /api/register
POST /api/login
```

### Lost Items

```text
GET    /api/lost-items
POST   /api/lost-items
GET    /api/lost-items/:id
PUT    /api/lost-items/:id
DELETE /api/lost-items/:id
```

### Found Items

```text
GET    /api/found-items
POST   /api/found-items
GET    /api/found-items/:id
PUT    /api/found-items/:id
DELETE /api/found-items/:id
```

> Endpoint names may change according to the final backend implementation.

---

# Screenshots

## Home Page

Add your project screenshot here:

```markdown
![Home Page](screenshots/home.png)
```

## Dashboard

```markdown
![Dashboard](screenshots/dashboard.png)
```

## Lost & Found Items

```markdown
![Items](screenshots/items.png)
```

## Report Item

```markdown
![Report Item](screenshots/report.png)
```

---

# Security Considerations

The application is designed with basic security principles in mind:

* User authentication
* Input validation
* Server-side validation
* Database access through controlled backend routes
* Protection of private user information
* Avoiding direct database access from the frontend
* Environment variables for sensitive configuration

Sensitive credentials should **never be committed to GitHub**.

Use a `.env` file for local configuration and add it to `.gitignore`.

Example:

```text
.env
node_modules/
uploads/
```

---

# Future Roadmap

The project can be extended with several advanced features.

### Phase 1 — Core System

* [x] User authentication
* [x] Lost item reporting
* [x] Found item reporting
* [x] Item search
* [x] My Reports
* [x] MySQL integration

### Phase 2 — Smart Features

* [ ] Automated lost/found matching
* [ ] Image-based item matching
* [ ] Advanced filtering
* [ ] Email notifications
* [ ] Real-time messaging

### Phase 3 — Campus Integration

* [ ] Interactive campus map
* [ ] Location-based reports
* [ ] Admin dashboard
* [ ] Campus-specific announcements
* [ ] Mobile application

---

# Why This Project?

Campus Lost & Found addresses a simple but common problem in university environments.

The project demonstrates practical implementation of:

* Frontend development
* Backend development
* REST APIs
* Database management
* Authentication
* CRUD operations
* Software architecture
* User-centered design

It can also serve as a foundation for developing a larger campus management platform.

---

# Contributing

Contributions are welcome.

### Steps

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push the branch.

```bash
git push origin feature/new-feature
```

6. Open a Pull Request.

---

# License

This project was developed for **educational and academic purposes**.

---

## Authors

**Campus Lost & Found Development Team**

Developed as a university software engineering/web development project.

---

<p align="center">
  <strong>Lost something? Found something?</strong><br>
  Help reconnect it with its owner.
</p>

<p align="center">
  ⭐ Star this repository if you find the project useful.
</p>
