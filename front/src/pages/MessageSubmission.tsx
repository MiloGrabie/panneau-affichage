import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MessageSubmission.css';

interface MessageSubmissionProps {
  onSubmit: (message: { text: string }) => Promise<void>;
  validateCode: (code: string) => Promise<boolean>;
}

const MessageSubmission: React.FC<MessageSubmissionProps> = ({ onSubmit, validateCode }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const validationInProgress = useRef(false);

  useEffect(() => {
    const validateCodeAsync = async () => {
      if (!code || validationInProgress.current) {
        return;
      }

      validationInProgress.current = true;
      try {
        const isValid = await validateCode(code);
        if (!isValid) {
          navigate('/');
        }
      } catch (err) {
        setError('Erreur lors de la validation du code');
        navigate('/');
      } finally {
        setIsValidating(false);
      }
    };

    validateCodeAsync();

    return () => {
      validationInProgress.current = false;
    };
  }, [code, validateCode, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!text.trim()) {
      setError('Veuillez entrer un message');
      return;
    }

    if (text.length > 200) {
      setError('Le message ne doit pas dépasser 200 caractères');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({ text });
      navigate('/');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi du message');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isValidating) {
    return (
      <div className="message-submission">
        <h1>Validation du code...</h1>
      </div>
    );
  }

  return (
    <div className="message-submission">
      <h1>Soumettre un message</h1>
      <p className="code-info">Code d'accès : {code}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Votre message :</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={150}
            placeholder="Entrez votre message (max 150 caractères)"
            rows={4}
          />
          <div className="char-count">
            {text.length}/150 caractères
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>
      </form>
    </div>
  );
};

export default MessageSubmission; 