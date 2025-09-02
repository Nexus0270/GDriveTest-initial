import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>GDrive Upload App</h1>
          <p>Connect your Google Drive to start uploading files</p>
        </div>
        
        <div className="login-content">
          <div className="login-card">
            <div className="login-icon">
              <span role="img" aria-label="cloud">☁️</span>
            </div>
            
            <h2>Welcome Back!</h2>
            <p>Sign in with your Google account to access your Drive</p>
            
            <button className="google-login-btn" onClick={handleGoogleLogin}>
              <span className="google-icon">🔐</span>
              Sign in with Google
            </button>
            
            <div className="login-info">
              <p>• Your files will be uploaded to a "GDrive Uploads" folder</p>
              <p>• You only need to sign in once per session</p>
              <p>• Your data is secure and private</p>
            </div>
          </div>
        </div>
        
        <div className="login-footer">
          <p>Need help? Check the setup guide for troubleshooting</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
