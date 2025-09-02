# OAuth 2.0 Setup Guide for Google Drive Upload

## **Step-by-Step Google Cloud Console Setup**

### **Step 1: Create a Google Cloud Project**

1. **Go to Google Cloud Console**:
   - Visit: https://console.cloud.google.com/
   - Click "Select a project" or "New Project"
   - Create a new project or select existing one

2. **Enable Billing** (Required):
   - Go to "Billing" in the left menu
   - Link a billing account to your project

### **Step 2: Enable Google Drive API**

1. **Navigate to APIs & Services**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click on "Google Drive API"
   - Click "Enable"

2. **Enable Additional APIs** (Optional):
   - Search for "Google Drive API v3"
   - Click "Enable"

### **Step 3: Create OAuth 2.0 Credentials**

1. **Go to Credentials**:
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"

2. **Configure OAuth Consent Screen**:
   - If prompted, click "Configure Consent Screen"
   - Choose "External" user type
   - Fill in required information:
     - **App name**: "GDrive Upload App"
     - **User support email**: Your email
     - **Developer contact information**: Your email
   - Click "Save and Continue"
   - Skip scopes section, click "Save and Continue"
   - Add test users if needed, click "Save and Continue"

3. **Create OAuth Client ID**:
   - **Application type**: "Web application"
   - **Name**: "GDrive Upload Web Client"
   - **Authorized redirect URIs**: 
     - Add: `http://localhost:5000/auth/google/callback`
   - Click "Create"

4. **Download Credentials**:
   - You'll see a popup with your credentials
   - **Copy the Client ID and Client Secret**
   - Keep these safe - you'll need them for the backend

### **Step 4: Update Backend Configuration**

1. **Edit `backend/server.js`**:
   ```javascript
   // Replace these values with your actual credentials
   const CLIENT_ID = "YOUR_ACTUAL_CLIENT_ID";
   const CLIENT_SECRET = "YOUR_ACTUAL_CLIENT_SECRET";
   ```

2. **Example**:
   ```javascript
   const CLIENT_ID = "123456789-abcdef.apps.googleusercontent.com";
   const CLIENT_SECRET = "GOCSPX-YourActualSecretHere";
   ```

### **Step 5: Test the Setup**

1. **Start Backend**:
   ```bash
   cd backend
   node server.js
   ```

2. **Start Frontend**:
   ```bash
   cd gdrive-hakeem
   npm start
   ```

3. **Test Authentication**:
   - Go to `http://localhost:3000`
   - Click "🔐 Authenticate with Google"
   - You'll be redirected to Google's OAuth page
   - Sign in with your Google account
   - Grant permissions to the app
   - You'll be redirected back with success message

## **How OAuth 2.0 Works**

1. **User clicks "Authenticate"** → Redirected to Google OAuth
2. **User signs in** → Google asks for permissions
3. **User grants access** → Google redirects back with authorization code
4. **Backend exchanges code** → Gets access tokens
5. **Backend uses tokens** → To access Google Drive API
6. **User uploads files** → Files go to their personal Google Drive

## **Benefits of OAuth 2.0**

- ✅ **No storage quota issues** - Uses your personal Google Drive
- ✅ **No service account setup** - Uses your regular Google account
- ✅ **Better security** - User controls their own data
- ✅ **Simpler setup** - No complex permissions needed
- ✅ **Personal storage** - Files go to your own Drive

## **Troubleshooting**

### **"redirect_uri_mismatch" Error**
- Make sure the redirect URI in Google Cloud Console matches exactly:
  - `http://localhost:5000/auth/google/callback`
- No trailing slashes or extra spaces

### **"invalid_client" Error**
- Check that CLIENT_ID and CLIENT_SECRET are correct
- Make sure you copied the entire values

### **"access_denied" Error**
- User may have denied permissions
- Try authenticating again

### **"invalid_grant" Error**
- Authorization code expired
- Try authenticating again

## **Security Notes**

- **Never commit credentials** to version control
- **Use environment variables** in production:
  ```javascript
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  ```

## **Production Deployment**

For production, you'll need to:
1. Add your production domain to authorized redirect URIs
2. Use environment variables for credentials
3. Implement proper token storage (database)
4. Add token refresh logic

## **Success Indicators**

✅ **Backend starts without errors**
✅ **Authentication flow works**
✅ **User can sign in with Google**
✅ **Files upload to personal Google Drive**
✅ **No storage quota errors**

Your OAuth 2.0 setup is now complete!
