# API Endpoints Documentation

## Authentication Routes

### POST /auth/login

- **Description:** Log in a user
- **Request Body:**
  - `username` (string): User's username
  - `password` (string): User's password
- **Response:**
  - 200 OK: Successful login
  - 401 Unauthorized: Invalid username or password

### POST /auth/logout

- **Description:** Log out the authenticated user
- **Response:**
  - Redirect to homepage

### GET /auth/google

- **Description:** Initiate the Google OAuth2 authentication process
- **Response:**
  - Redirects to the Google authentication page with specified scopes ('profile', 'email')

### GET /auth/google/callback

- **Description:** Callback endpoint for Google OAuth2 authentication
- **Response:**
  - Redirects to the specified URL (e.g., 'https://medix-navy.vercel.app') after successful authentication

## User Routes

### POST /api/users

- **Description:** Create a new user
- **Request Body:**
  - `username` (string): User's username
  - `email` (string): User's email
  - `password` (string): User's password (hashed)
- **Response:**
  - 201 Created: User successfully created
  - 400 Bad Request: Invalid request or password too short

### GET /api/users

- **Description:** Get a list of all users
- **Response:**
  - 200 OK: List of users

## Assistant Routes

### GET /assistant

- **Description:** Get information about all assistants
- **Response:**
  - 200 OK: List of all assistants

### POST /assistant/chat

- **Description:** Start a new chat with the assistant
- **Request Body:**
  - `prompt` (string): User's prompt
- **Response:**
  - 200 OK: Conversation started, returns thread ID

### POST /assistant/threads

- **Description:** Load messages in a specific thread
- **Request Body:**
  - `id` (string): Thread ID
- **Response:**
  - 200 OK: List of messages in the thread

### POST /assistant/messages

- **Description:** Get all messages in a specific thread
- **Request Body:**
  - `id` (string): Thread ID
- **Response:**
  - 200 OK: List of messages in the thread

### POST /assistant/history

- **Description:** Get the user's conversation history (threads)
- **Response:**
  - 200 OK: List of threads

### POST /assistant/prompt

- **Description:** Update a thread with a new message
- **Request Body:**
  - `id` (string): Thread ID
  - `prompt` (string): User's message
- **Response:**
  - 200 OK: Updated thread with new message