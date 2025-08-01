# Authentication System Setup Instructions

## Backend Setup

1. **Create a `.env` file in the `backend` directory with the following variables:**

```env
# MongoDB Connection String
MONGO_URL=mongodb://localhost:27017/your_database_name

# JWT Secret Key (generate a strong secret key)
SECRET_KEY=your_super_secret_jwt_key_here

# Server Port (optional, defaults to 8000)
PORT=8000
```

2. **Start the backend server:**

```bash
cd backend
npm start
```

## Frontend Setup

1. **Create a `.env` file in the `frontend` directory:**

```env
VITE_BACKEND_URL=http://localhost:8000
```

2. **Start the frontend development server:**

```bash
cd frontend
npm run dev
```

## Workflow Overview

### Authentication Flow:

1. **User visits the app** → Shows login page by default
2. **User can switch to register** → Create new account
3. **After successful login/register** → Redirected to code editor
4. **User can logout** → Returns to login page
5. **Session persistence** → User stays logged in on page refresh

### Features:

- ✅ User registration with validation
- ✅ User login with password hashing
- ✅ JWT token authentication
- ✅ Session persistence using localStorage
- ✅ Protected code editor (only accessible when logged in)
- ✅ Modern UI with Tailwind CSS
- ✅ Form validation and error handling
- ✅ Loading states and user feedback

### API Endpoints:

- `POST /register` - User registration
- `POST /login` - User login
- `POST /run` - Execute C++ code (existing)

### Security Features:

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- Error handling
- Secure password requirements (minimum 6 characters)

## Testing the System

1. Start both backend and frontend servers
2. Visit the frontend URL (usually http://localhost:5173)
3. Try registering a new account
4. Try logging in with the registered account
5. Test the code editor functionality
6. Test logout functionality

## Troubleshooting

- **MongoDB Connection Error**: Make sure MongoDB is running and the connection string is correct
- **JWT Error**: Ensure SECRET_KEY is set in the backend .env file
- **CORS Error**: The backend already has CORS configured
- **Frontend Connection Error**: Check that VITE_BACKEND_URL points to the correct backend URL
