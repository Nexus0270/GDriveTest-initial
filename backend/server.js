const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { google } = require("googleapis");
const fs = require("fs");

require("dotenv").config(); // Add this line

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Multer: store file temporarily
const upload = multer({ dest: "uploads/" });

// OAuth 2.0 configuration
const SCOPES = [
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive"
];

// OAuth 2.0 credentials - hardcoded for now
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5000/auth/google/callback";

// Store tokens persistently (in production, use a database)
let tokens = {};
let drive = null;

// OAuth 2.0 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Check if we have stored tokens and initialize drive
const initializeDrive = () => {
  if (tokens.access_token) {
    oauth2Client.setCredentials(tokens);
    drive = google.drive({ version: "v3", auth: oauth2Client });
    console.log("✅ Drive initialized with stored tokens");
    return true;
  }
  return false;
};

// Auth endpoint - redirects user to Google OAuth
app.get("/auth/google", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent"
  });
  res.redirect(authUrl);
});

// OAuth callback endpoint
app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  
  try {
    const { tokens: newTokens } = await oauth2Client.getToken(code);
    tokens = newTokens;
    oauth2Client.setCredentials(tokens);
    
    // Initialize drive with OAuth tokens
    drive = google.drive({ version: "v3", auth: oauth2Client });
    
    console.log("✅ Authentication successful! Tokens stored.");
    
    res.json({ 
      success: true, 
      message: "Authentication successful! You can now upload files.",
      authenticated: true
    });
  } catch (error) {
    console.error("Error getting tokens:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Logout endpoint
app.post("/logout", (req, res) => {
  tokens = {};
  drive = null;
  console.log("✅ User logged out successfully");
  res.json({ 
    success: true, 
    message: "Logged out successfully" 
  });
});

// Health check endpoint
app.get("/", (req, res) => {
  const isAuthenticated = !!tokens.access_token && !!drive;
  res.json({ 
    message: "Backend server is running!",
    status: "healthy",
    googleDrive: !!drive,
    authenticated: isAuthenticated
  });
});

// Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  // Check if drive is initialized, if not try to initialize with stored tokens
  if (!drive) {
    if (!initializeDrive()) {
      return res.status(500).json({ 
        success: false, 
        error: "Google Drive not authenticated. Please authenticate first at /auth/google" 
      });
    }
  }

  try {
    // Find or create folder in user's Google Drive
    let folderId = req.body.folderId;
    
    if (!folderId) {
      // Search for existing folder
      const folderResponse = await drive.files.list({
        q: "name='GDrive Uploads' and mimeType='application/vnd.google-apps.folder'",
        fields: "files(id, name)",
      });

      if (folderResponse.data.files.length > 0) {
        folderId = folderResponse.data.files[0].id;
      } else {
        // Create new folder
        const folderMetadata = {
          name: "GDrive Uploads",
          mimeType: "application/vnd.google-apps.folder",
        };

        const folder = await drive.files.create({
          resource: folderMetadata,
          fields: "id, name",
        });

        folderId = folder.data.id;
      }
    }

    const fileMetadata = {
      name: req.file.originalname,
      parents: [folderId],
    };

    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, name, webViewLink",
    });

    // Remove local temp file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      file: response.data,
      folderId: folderId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`✅ OAuth credentials loaded successfully`);
  console.log(`✅ Client ID: ${CLIENT_ID.substring(0, 20)}...`);
  
  // Try to initialize drive with stored tokens on startup
  if (initializeDrive()) {
    console.log("✅ Drive initialized with stored tokens on startup");
  } else {
    console.log("ℹ️  No stored tokens found. User needs to authenticate at /auth/google");
  }
});
