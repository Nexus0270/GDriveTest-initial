# GDrive Upload Application

A React frontend application that connects to a Node.js backend to upload files to Google Drive.

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure you have a `service-account.json` file in the backend directory with your Google Drive API credentials.

4. Start the backend server:
   ```bash
   node server.js
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd gdrive-hakeem
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## How to Use

1. Open your browser and go to `http://localhost:3000`
2. Click "Choose File" to select a file from your computer
3. Click "Upload File" to upload it to Google Drive
4. The file will be uploaded to a "GDrive Uploads" folder in your Google Drive
5. You'll see a success message with a link to view the file in Google Drive

## Features

- File selection and upload to Google Drive
- Automatic folder creation in Google Drive
- Real-time upload status feedback
- File size display
- Success/error messaging
- Responsive design

## API Endpoints

- `GET /` - Health check
- `POST /upload` - Upload file to Google Drive
- `POST /create-folder` - Create a new folder in Google Drive

## Requirements

- Node.js and npm
- Google Drive API credentials (service account)
- React development environment
