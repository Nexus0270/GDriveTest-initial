# Fixing "Insufficient Authentication Scopes" Error

## Problem
The error "Request had insufficient authentication scopes" occurs when the service account doesn't have the right permissions to access Google Drive features.

## Solutions

### **Solution 1: Update Service Account Permissions**

1. **Go to Google Cloud Console**:
   - Visit: https://console.cloud.google.com/
   - Select your project

2. **Update Service Account Roles**:
   - Go to "IAM & Admin" > "IAM"
   - Find your service account
   - Click the pencil icon to edit
   - Add these roles:
     - **Editor** (if not already added)
     - **Drive Admin** (for shared drive access)
     - **Service Account Token Creator**

3. **Enable Domain-Wide Delegation** (if using Google Workspace):
   - Go to "IAM & Admin" > "Service Accounts"
   - Click on your service account
   - Go to "Keys" tab
   - Add a new key (JSON)
   - Download and replace your `service-account.json`

### **Solution 2: Enable Required APIs**

1. **Enable Google Drive API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

2. **Enable Google Drive API v3**:
   - Search for "Google Drive API v3"
   - Click "Enable"

3. **Enable Admin SDK** (for shared drives):
   - Search for "Admin SDK"
   - Click "Enable"

### **Solution 3: Create New Service Account**

If the above doesn't work, create a fresh service account:

1. **Create New Service Account**:
   ```bash
   # In Google Cloud Console:
   # 1. Go to "IAM & Admin" > "Service Accounts"
   # 2. Click "Create Service Account"
   # 3. Name: "gdrive-upload-service-v2"
   # 4. Description: "Service account for Google Drive uploads with full permissions"
   # 5. Grant these roles:
   #    - Editor
   #    - Drive Admin
   #    - Service Account Token Creator
   ```

2. **Download New Key**:
   - Create a new JSON key
   - Download and replace `service-account.json`

### **Solution 4: Manual Shared Drive Setup**

If shared drives still have issues, manually create one:

1. **Go to Google Drive**:
   - Visit: https://drive.google.com
   - Click "Shared drives" in left sidebar

2. **Create Shared Drive**:
   - Click "New" > "Shared drive"
   - Name: "GDrive Uploads Shared Drive"

3. **Add Service Account**:
   - Click "Add members"
   - Add your service account email: `drivereact@drivereact-470915.iam.gserviceaccount.com`
   - Role: "Manager"

### **Solution 5: Use Regular Drive (Fallback)**

The updated code now includes a fallback to regular Google Drive if shared drives fail:

1. **Restart Backend**:
   ```bash
   cd backend
   node server.js
   ```

2. **Test Upload**:
   - The app will try shared drives first
   - If that fails, it will use regular drive
   - Check console logs for which method is used

## Testing the Fix

1. **Check Health Endpoint**:
   ```bash
   curl http://localhost:5000/
   ```
   Should return: `{"googleDrive": true}`

2. **Test Shared Drives**:
   ```bash
   curl http://localhost:5000/shared-drives
   ```
   Should return list of shared drives or empty array

3. **Upload a File**:
   - Go to `http://localhost:3000`
   - Select and upload a file
   - Check console logs for success message

## Common Issues and Fixes

### **"Permission denied" Error**
- Make sure service account has "Editor" role
- Add "Drive Admin" role for shared drive access

### **"API not enabled" Error**
- Enable Google Drive API in Google Cloud Console
- Wait 5-10 minutes after enabling

### **"Service account not found" Error**
- Check that `service-account.json` exists in backend directory
- Verify the JSON file is valid and complete

### **"Shared drive creation failed" Error**
- The app will automatically fallback to regular drive
- Check console logs for which method is being used

## Updated Scopes

The backend now uses these scopes:
```javascript
const SCOPES = [
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.metadata.readonly"
];
```

This provides full access to Google Drive features including shared drives.

## Success Indicators

✅ **Backend starts without warnings**
✅ **Health endpoint returns `{"googleDrive": true}`**
✅ **File uploads complete successfully**
✅ **Files appear in Google Drive (shared or regular)**

The application will now work with either shared drives or regular drive as a fallback!
