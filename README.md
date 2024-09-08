## Live Demo

You can view the deployed application [here](https://vegaeditmaster.netlify.app/).
# Vega EditMaster

Vega EditMaster is a dynamic image editing application that allows users to fetch images from an API, apply various edits, and download the modified images. It features a robust canvas editor built with Fabric.js, enabling real-time modifications and a seamless user experience.

## Features

- **Image Fetching**: Search and fetch images using the integrated API.
- **Canvas Editing**: Apply various shapes, text, and background images on a canvas using Fabric.js.
- **Real-Time Editing**: Make changes in real-time on the canvas without needing to navigate away.
- **Download Option**: Save the edited images to your local system.
- **Responsive Design**: The application is fully responsive, providing an optimal experience across devices.

## Tech Stack

- **ReactJS**: A JavaScript library for building user interfaces.
- **Fabric.js**: A powerful canvas library for managing and editing images and shapes.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: For making HTTP requests to fetch images from the API.
- **Vite**: A modern build tool that provides fast development and optimized builds.

## File Structure

```
src/
├── components/
│ ├── AddNote.jsx # Component for adding new notes
│ ├── EditNote.jsx # Component for editing existing notes
│ ├── Footer.jsx # Footer component for the application
│ ├── Github.jsx # Component to display GitHub profile information (if applicable)
│ ├── Navbar.jsx # Navigation bar component
│ └── Notes.jsx # Component to list and manage notes
├── app/
│ └── Store.js # Configuration of the Redux store
├── features/
│ └── note/
│ ├── localStorage.js # Manages the persistence of application state
│ └── noteSlice.js # Handles the state management for notes
├── index.css # Global CSS styles
├── App.jsx # Main application component that sets up routing and layout
└── main.jsx # Entry point for the React application, including routing and Redux provider setup
```

## Setup and Running Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/TheChiragKaushik/Notes-App.git

2. **Navigate to the Project Directory**
   ```bash
   cd note-taking-app

3. **Install Dependencies**
   ```bash
   npm install

4. **Run the Application**
   ```bash
   npm run dev

The application will start and be accessible at http://localhost:5173. 
