import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import './AdminPanel.css';

interface AdminPanelProps {
  onGenerateCode: () => Promise<string | null>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onGenerateCode }) => {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const navigate = useNavigate();

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    try {
      const newCode = await onGenerateCode();
      if (newCode) {
        setGeneratedCode(newCode);
      }
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearMessages = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous les messages ?')) {
      setIsClearing(true);
      try {
        const response = await fetch('http://localhost:8000/messages', {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Tous les messages ont été supprimés');
        } else {
          throw new Error('Failed to clear messages');
        }
      } catch (error) {
        console.error('Error clearing messages:', error);
        alert('Erreur lors de la suppression des messages');
      } finally {
        setIsClearing(false);
      }
    }
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
        <div className="button-group">
          <button 
            className="generate-button"
            onClick={handleGenerateCode}
            disabled={isGenerating}
          >
            {isGenerating ? 'Génération en cours...' : 'Générer un nouveau code'}
          </button>

          <button 
            className="clear-button"
            onClick={handleClearMessages}
            disabled={isClearing}
          >
            {isClearing ? 'Suppression en cours...' : 'Supprimer tous les messages'}
          </button>
        </div>

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
            <a 
              href={getSubmitUrl(generatedCode)}
              target="_blank"
              rel="noopener noreferrer"
              className="submit-link"
            >
              Accéder directement au formulaire
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 