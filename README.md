# FollowUpPing 📌

**Never miss an important follow-up again.**

FollowUpPing is a lightweight, full-stack follow-up reminder dashboard designed for job seekers, freelancers, and startup founders to track important follow-ups and never miss deadlines.

## 🚀 Quick Links

- **🎯 [Quick Start](QUICKSTART.md)** - Get running in 5 minutes
- **📚 [Full Documentation](#table-of-contents)** - Everything below
- **🔧 [GitHub Setup](GITHUB_SETUP.md)** - Push to GitHub
- **🚀 [Deploy to Production](DEPLOYMENT.md)** - Host your app
- **👥 [Contributing](CONTRIBUTING.md)** - Help improve FollowUpPing

---

## Table of Contents

1. [Features](#features)
2. [Quick Start](#quick-start)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Database Schema](#database-schema)
6. [Installation](#installation--setup)
7. [API Endpoints](#api-endpoints)
8. [Database Access](#-viewing-the-database)
9. [Development](#development-features)
10. [Future Improvements](#future-improvements)
11. [Database Decisions](#database-decisions)

---

## Features

✨ **Dashboard Overview**
- Quick stats on follow-ups (Due Today, Upcoming, Overdue, Completed)
- Animated stat cards with hover effects
- Real-time follow-up tracking

📝 **Follow-up Management**
- Create new follow-ups with person name, context, date, and notes
- Update follow-up status (pending/completed)
- Delete follow-ups with confirmation modal
- Sort and view all follow-ups

🎯 **Smart Status Tracking**
- Pending (Blue)
- Completed (Green)
- Overdue alerts (Red/Orange)
- Due today indicators (Flame icon)

🎨 **Premium UI/UX**
- Clean, modern design with Tailwind CSS
- Smooth animations and transitions
- Responsive layout for mobile and desktop
- Professional SaaS-style interface

## Tech Stack

### Backend
- **Framework**: Python Flask 3.0.0
- **ORM**: SQLAlchemy 2.0.23
- **Database**: SQLite (local development) / Any SQL database
- **API**: RESTful JSON API with CORS support
- **Server**: Werkzeug development server

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.9
- **Styling**: Tailwind CSS 3.3.3
- **Icons**: Lucide React 0.292.0
- **Routing**: React Router DOM 6.14.2
- **Date Handling**: date-fns 2.30.0

### Database
- **Type**: Relational SQL (SQLite for local development)
- **Auto-initialization**: Creates tables on first run
- **Persistence**: Automatic data persistence in `followups.db`

## Project Structure

```
FollowUp's/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── config.py           # Configuration management
│   ├── models.py           # SQLAlchemy models (FollowUp)
│   ├── routes.py           # API endpoints
│   ├── database.py         # Database initialization
│   └── requirements.txt    # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx      # Main dashboard
│   │   │   └── AddFollowUpPage.jsx    # Create new follow-up
│   │   ├── components/
│   │   │   └── index.js               # Reusable components
│   │   │       - StatusBadge
│   │   │       - FollowUpCard
│   │   │       - FollowUpTable
│   │   │       - DeleteConfirmModal
│   │   ├── api/
│   │   │   └── client.js              # API client
│   │   ├── App.jsx                    # Root component with routing
│   │   ├── main.jsx                   # Entry point
│   │   └── index.css                  # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── index.html
│
└── README.md
```

## Database Schema

### `followups` table
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO_INCREMENT |
| `person_name` | VARCHAR(255) | NOT NULL, INDEXED |
| `context` | VARCHAR(255) | NOT NULL |
| `followup_date` | DATE | NOT NULL, INDEXED |
| `status` | ENUM | DEFAULT 'pending' (pending/completed) |
| `notes` | TEXT | NULLABLE |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP |

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+ & npm

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server**
   ```bash
   python app.py
   ```
   The server will start at `http://localhost:5000`
   - Database will auto-initialize as `followups.db`
   - Tables are created automatically on first run

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Running Both Simultaneously

**Terminal 1 (Backend)**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

**Terminal 2 (Frontend)**
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser!

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get all follow-ups
```http
GET /api/followups
```
**Response:**
```json
[
  {
    "id": 1,
    "person_name": "Google Recruiter",
    "context": "Job Application",
    "followup_date": "2026-02-20",
    "status": "pending",
    "notes": "Sent resume, waiting reply",
    "created_at": "2026-02-19T10:30:00"
  }
]
```

#### Get statistics
```http
GET /api/followups/stats
```
**Response:**
```json
{
  "due_today": 2,
  "upcoming": 5,
  "overdue": 1,
  "completed": 8
}
```

#### Create new follow-up
```http
POST /api/followups
Content-Type: application/json

{
  "person_name": "Google Recruiter",
  "context": "Job Application",
  "followup_date": "2026-02-20",
  "notes": "Sent resume, waiting reply"
}
```
**Response:** `201 Created`

#### Update follow-up
```http
PUT /api/followups/<id>
Content-Type: application/json

{
  "status": "completed"
}
```
**Response:** `200 OK`

#### Delete follow-up
```http
DELETE /api/followups/<id>
```
**Response:** `200 OK`

#### Health check
```http
GET /api/health
```
**Response:**
```json
{"status": "ok"}
```

## Features in Detail

### Dashboard Page (`/`)
- **Summary Cards**: Visual stats with icons and colors
- **Follow-up List**: All follow-ups grouped by status
- **Quick Actions**: Mark completed, delete directly from dashboard
- **Responsive Design**: Works on mobile, tablet, and desktop

### Add Follow-up Page (`/new`)
- **Form Fields**:
  - Person Name (required, text input)
  - Context (required, dropdown with 4 preset options)
  - Follow-up Date (required, date picker with future dates only)
  - Notes (optional, textarea)
- **Validation**: Client-side and server-side validation
- **Navigation**: Easy back button to dashboard
- **Error Handling**: Display validation errors

### Status Indicators
- **Pending**: Blue badge with clock icon
- **Completed**: Green badge with checkmark
- **Overdue**: Red urgent indicator
- **Due Today**: Flame icon with red background

### Animations
- Card hover: Subtle lift effect (translateY)
- Button press: Scale animation
- Transitions: Smooth 200ms transitions throughout
- Loading: Spinner while fetching data

## Database Persistence

By default (local development):
- Data is stored in `followups.db` (SQLite file)
- Database is auto-created on first run
- Persists across application restarts
- To reset database: Delete `followups.db` file

### 📊 Viewing the Database

#### Option 1: Using SQLite Browser (Easy - Recommended)
1. **Download DB Browser for SQLite**: https://sqlitebrowser.org/
2. **Open the database**:
   - Go to `File` → `Open Database`
   - Navigate to: `c:\Projects\FollowUp's\backend\followups.db`
3. **View your data**:
   - Click the `Browse Data` tab
   - Select table: `followups`
   - See all your follow-ups with live updates!

#### Option 2: Using Command Line
```bash
# Install SQLite (if not already installed)
choco install sqlite  # or download from sqlite.org

# Open the database
sqlite3 c:\Projects\FollowUp's\backend\followups.db

# View all follow-ups
SELECT * FROM followups;

# View follow-ups by status
SELECT * FROM followups WHERE status = 'pending';

# View overdue follow-ups
SELECT * FROM followups WHERE followup_date < DATE('now') AND status = 'pending';

# Count follow-ups by context
SELECT context, COUNT(*) FROM followups GROUP BY context;
```

#### Option 3: Using Python
```python
import sqlite3

# Connect to database
conn = sqlite3.connect('c:\\Projects\\FollowUp\'s\\backend\\followups.db')
cursor = conn.cursor()

# Get all follow-ups
cursor.execute('SELECT * FROM followups')
for row in cursor.fetchall():
    print(row)

conn.close()
```

### 🔍 Database Schema

```sql
CREATE TABLE followups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  person_name VARCHAR(255) NOT NULL,
  context VARCHAR(255) NOT NULL,
  followup_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY(status) REFERENCES statuses(value)
);

-- Status enum values: 'pending', 'completed'
```

### 💾 Downloading/Backing Up Your Database

The database file is located at:
```
c:\Projects\FollowUp's\backend\followups.db
```

To backup:
1. Navigate to the backend folder
2. Copy `followups.db` to your desired location
3. Keep it safe!

For production, update `SQLALCHEMY_DATABASE_URI` in `config.py` to use PostgreSQL, MySQL, etc.

## Development Features

### Error Handling
- Try-catch on all API calls
- User-friendly error messages
- Automatic retry capability on dashboard
- Server-side validation for all inputs

### Code Organization
- Modular component structure
- Reusable API client
- Clean separation of concerns
- Environment-based configuration

### Styling System
- Tailwind CSS utility-first approach
- Custom Tailwind config with brand colors
- Component button classes (btn, btn-primary, btn-danger)
- Responsive grid layouts

## Future Improvements

- 🔔 Email/SMS notifications for upcoming follow-ups
- 🔄 Recurring follow-ups
- 📊 Analytics dashboard (follow-up completion rates)
- 🏷️ Custom tags and categories
- 🔐 User authentication and multi-user support
- 📱 Mobile app (React Native)
- 🌙 Dark mode
- 🔍 Search and filter functionality
- 📅 Calendar view of follow-ups
- 🎯 Bulk operations (mark all as complete, bulk delete)
- ⏰ Time-based reminders and notifications
- 💬 Notes history and comments
- 🔗 Integration with email and calendar

## Database Decisions

### Why SQL (Relational Database)?
1. **ACID Compliance**: Guarantees data integrity for follow-ups
2. **Structured Data**: Follow-ups have a fixed schema
3. **Relational Integrity**: Easy to extend with users, contacts, etc.
4. **Querying**: Complex filtering (due today, overdue, etc.)
5. **Local Development**: SQLite requires no setup or external service
6. **Production Ready**: Easy migration to PostgreSQL or MySQL

### Why NOT NoSQL (MongoDB, Firebase)?
- Over-engineered for structured data
- Inconsistent data format issues
- Higher operational complexity
- Not suitable for relational data patterns
- Overkill for a focused product

## Configuration

### Backend Configuration Files
- `config.py`: Environment-based config (dev, test, prod)
- `database.py`: SQLAlchemy session and initialization
- `requirements.txt`: Python package dependencies

### Frontend Configuration Files
- `vite.config.js`: Build and dev server config with API proxy
- `tailwind.config.js`: Custom Tailwind theme (colors, fonts, spacing)
- `postcss.config.js`: CSS processing with Tailwind and autoprefixer

### Environment Variables
Optional on backend (see `config.py`):
```bash
FLASK_ENV=development
DATABASE_URL=sqlite:///followups.db
```

## Support & Contributing

For issues, questions, or suggestions:
1. Check existing issues
2. Provide clear reproduction steps
3. Include server logs if applicable

## License

MIT License - Free to use and modify for personal or commercial projects.

---

**Built with ❤️ using Flask, React, and Tailwind CSS**
#   F o l l o w U p P i n g  
 