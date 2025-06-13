import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const navigate = useNavigate();

  const generateUniqueCode = () => {
    // Génère un code alphanumérique de 8 caractères
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleGenerateCode = () => {
    const newCode = generateUniqueCode();
    setGeneratedCode(newCode);
  };

  const getSubmitUrl = (code: string) => {
    return `${window.location.origin}/submit/${code}`;
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Administration</h1>
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          Retour au panneau
        </button>
      </div>

      <div className="admin-content">
        <button 
          className="generate-button"
          onClick={handleGenerateCode}
        >
          Générer un nouveau code
        </button>

        {generatedCode && (
          <div className="qr-section">
            <h2>Code généré : {generatedCode}</h2>
            <div className="qr-container">
              <QRCodeSVG 
                value={getSubmitUrl(generatedCode)}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="qr-info">
              Scannez ce QR code pour accéder au formulaire de soumission
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 