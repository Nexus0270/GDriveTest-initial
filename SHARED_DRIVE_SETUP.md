# GDrive Upload Application - Shared Drive Solution

A React frontend application that connects to a Node.js backend to upload files to Google Drive using Shared Drives (which have unlimited storage).

## Problem Solved

**Issue**: Service Accounts don't have storage quota in Google Drive
**Solution**: Use Shared Drives which provide unlimited storage for service accounts

## Setup Instructions

### 1. Google Cloud Console Setup

#### Enable Required APIs:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Library"
3. Enable these APIs:
   - **Google Drive API**
   - **Google Drive API v3**

#### Create Service Account:
1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name: `gdrive-upload-service`
4. Description: `Service account for Google Drive uploads`
5. Grant "Editor" role
6. Create and download the JSON key
7. Place it as `service-account.json` in the backend directory

#### Enable Shared Drive API:
1. Go to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click on it and ensure it's enabled
4. Go to "APIs & Services" > "Credentials"
5. Make sure your service account has access to Shared Drives

### 2. Shared Drive Setup

#### Option A: Create Shared Drive via API (Automatic)
The application will automatically create a shared drive if none exists.

#### Option B: Create Shared Drive Manually
1. Go to [Google Drive](https://drive.google.com)
2. Click "Shared drives" in the left sidebar
3. Click "New" > "Shared drive"
4. Name it "GDrive Uploads Shared Drive"
5. Add your service account email as a member with "Manager" role

### 3. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure you have `service-account.json` in the backend directory

4. Start the backend server:
   ```bash
   node server.js
   ```

### 4. Frontend Setup

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

## How It Works

1. **Shared Drive Detection**: The app automatically finds existing shared drives or creates a new one
2. **Folder Creation**: Creates a "GDrive Uploads" folder within the shared drive
3. **File Upload**: Uploads files to the shared drive folder
4. **Unlimited Storage**: Shared drives have unlimited storage, solving the quota issue

## API Endpoints

- `GET /` - Health check
- `GET /shared-drives` - List all shared drives
- `POST /create-shared-drive` - Create a new shared drive
- `POST /create-folder` - Create folder in shared drive
- `POST /upload` - Upload file to shared drive

## Troubleshooting

### "Service Accounts do not have storage quota" Error
**Solution**: The app now uses Shared Drives which have unlimited storage.

### "Permission denied" Error
**Solution**: Make sure your service account has "Manager" role in the shared drive.

### "Shared drive not found" Error
**Solution**: The app will automatically create a shared drive if none exists.

## Benefits of Shared Drives

- ✅ **Unlimited Storage**: No storage quotas
- ✅ **Service Account Compatible**: Perfect for automated uploads
- ✅ **Team Collaboration**: Multiple users can access
- ✅ **Admin Controls**: Better permission management
- ✅ **No Personal Storage Used**: Doesn't count against personal Drive quota

## Testing

1. Start both backend and frontend servers
2. Go to `http://localhost:3000`
3. Select a file and upload
4. Check your Google Drive > Shared drives for the uploaded file

The application will now work without storage quota issues!
