import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [authStatus, setAuthStatus] = useState({ authenticated: false, loading: true });
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/');
      const data = await response.json();
      setAuthStatus({ authenticated: data.authenticated, loading: false });
      
      if (!data.authenticated) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthStatus({ authenticated: false, loading: false });
      navigate('/login');
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first!');
      return;
    }

    setUploading(true);
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadStatus(`✅ File uploaded successfully! View it here: ${data.file.webViewLink}`);
        setSelectedFile(null);
        // Reset file input
        document.getElementById('file-input').value = '';
      } else {
        setUploadStatus(`❌ Upload failed: ${data.error}`);
      }
    } catch (error) {
      setUploadStatus(`❌ Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  if (authStatus.loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="landing-page">
      <div className="content">
        <p className="instruction">Click the button to start uploading!</p>
        
        <div className="upload-section">
          <input
            type="file"
            id="file-input"
            onChange={handleFileSelect}
            className="file-input"
            accept="*/*"
          />
          
          <button 
            className="upload-button"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload File'} 
            <span className="arrow">→</span>
          </button>
        </div>

        {selectedFile && (
          <p className="file-info">
            Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}

        {uploadStatus && (
          <p className={`upload-status ${uploadStatus.includes('✅') ? 'success' : uploadStatus.includes('❌') ? 'error' : 'info'}`}>
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
