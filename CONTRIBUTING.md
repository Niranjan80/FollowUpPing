# Contributing to FollowUpPing

Thank you for your interest in contributing! Here's how to get started.

## Development Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python app.py
```

Backend runs on: `http://localhost:5000`

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

Frontend runs on: `http://localhost:5174`

## Project Structure

```
followupping/
├── backend/
│   ├── app.py              # Flask application entry
│   ├── config.py           # Environment configuration
│   ├── database.py         # SQLAlchemy setup
│   ├── models.py           # Database models
│   ├── routes.py           # API endpoints
│   ├── requirements.txt    # Python dependencies
│   └── followups.db        # SQLite database (created on first run)
│
├── frontend/
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── api/            # API client
│   │   └── index.css       # Global styles
│   ├── package.json        # npm scripts
│   ├── vite.config.js      # Vite configuration
│   └── tailwind.config.js  # Tailwind theme
│
├── README.md               # Main documentation
├── GITHUB_SETUP.md         # GitHub setup guide
├── CONTRIBUTING.md         # This file
└── ai-notes.md             # Development notes
```

## Code Style

### Backend (Python)
- Follow PEP 8
- Use type hints where possible
- Keep functions focused and small
- Add docstrings to functions

### Frontend (JavaScript/React)
- Use functional components with hooks
- Follow Airbnb JavaScript style guide
- Use meaningful variable names
- Add comments for complex logic

## Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add comments where needed
   - Test thoroughly

3. **Commit with clear messages**
   ```bash
   git commit -m "Add feature: description"
   ```

4. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Testing

### Backend
```bash
cd backend
python -m pytest  # If tests are added
```

### Frontend
```bash
cd frontend
npm run test  # If tests are added
```

## Bug Reports

When reporting bugs, include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, Python version, Node version)
- Browser (for frontend bugs)

## Feature Requests

We'd love to hear about feature ideas! Please describe:
- What you want to accomplish
- Why it's important
- How it might be implemented

## Documentation

- Update `README.md` if changing features
- Update `GITHUB_SETUP.md` if changing setup
- Add comments to complex code
- Keep `ai-notes.md` updated with major changes

## Performance & Security

- Never hardcode secrets or API keys
- Use environment variables from `.env.example`
- Validate all user inputs
- Keep dependencies updated
- Test with real data before committing

## Questions?

- Check existing issues
- Review `README.md` and `ai-notes.md`
- Create a new issue with your question

---

**Thank you for contributing to FollowUpPing!** 🚀
