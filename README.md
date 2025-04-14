# Otabek Mahkamov Portfolio Website

A professional portfolio website built with React, Tailwind CSS, and Node.js.

## Features

- Modern and responsive design
- Portfolio showcase with filtering and search
- Achievements timeline
- Contact form
- Admin panel for content management
- Secure authentication

## Tech Stack

### Frontend

- React
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication
- Multer (for file uploads)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd om-portfolio
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd backend
npm install
```

4. Create a .env file in the backend directory:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/om-portfolio
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd ..
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Production Build

1. Build the frontend:

```bash
npm run build
```

2. Start the production server:

```bash
cd backend
npm start
```

## Admin Panel

The admin panel allows you to:

- Add, edit, and delete portfolio items
- Manage achievements
- View and manage contact messages

To access the admin panel:

1. Navigate to the login page
2. Use the admin credentials (set up during initial deployment)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
