import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handlePredict = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:8000/predict', formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CNN Image Classifier</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div>
          <img src={preview} alt="Preview" width="128" height="128" />
          <button onClick={handlePredict}>Predict</button>
        </div>
      )}
      {prediction && (
        <div>
          <h2>Prediction Probabilities:</h2>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;