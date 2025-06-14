// This component is designed to be displayed on a TV screen, showing only gas prices and messages
// No interactive elements should be added as it's meant for display-only purposes
import React, { useState, useEffect } from 'react';
import './GasPricePanel.css';

interface FuelPrice {
  type: string;
  label: string;
  price: number;
  unit: string;
  className: string;
}

interface Message {
  text: string;
  timestamp: number;
}

interface GasPricePanelProps {
  messages: Message[];
}

const GasPricePanel: React.FC<GasPricePanelProps> = ({ messages }) => {
  const [randomDigits, setRandomDigits] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateRandomDigits = () => {
      const newDigits: { [key: string]: string } = {};
      fuelPrices.forEach(fuel => {
        newDigits[fuel.type] = Math.floor(Math.random() * 100).toString().padStart(2, '0');
      });
      setRandomDigits(newDigits);
    };

    // Update immediately
    updateRandomDigits();

    // Update every 3 seconds
    const interval = setInterval(updateRandomDigits, 15000);

    return () => clearInterval(interval);
  }, []);

  const fuelPrices: FuelPrice[] = [
    { type: 'S/plomb 95-E10', label: 'SP-98', price:   1.8, unit: 'VODKA / POMME', className: 'sp95' },
    { type: 'Gazole', label: 'MAZOUTE', price: 0.6, unit: 'WHISKEY / COCA', className: 'courant' },
    { type: 'Courant Continu', label: 'DIESEL', price: 1.7, unit: 'VODKA / PECHE', className: 'gazole' },
  ];
 
  return (
    <div className="gas-price-panel">
      <footer className="price-footer">
        <div className="marquee-container">
          <div className="marquee">
            {messages.map((message, index) => (
              <span key={index} className="message">
                {message.text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </footer>
      <div className="price-grid">
        {fuelPrices.map((fuel) => (
          <div key={fuel.type} className="price-item">
            <div className={`fuel-type ${fuel.className}`}>
              {fuel.label}
              <span style={{ fontSize: '1.3rem' }}>{fuel.unit}</span>
            </div>
            <div className="price">
              <span className="price-number">
                {fuel.price}
              </span>
              <span className="last-digit">
                {randomDigits[fuel.type] || '00'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="panel-header">
        <h2 className="panel-title">Les Joints de Couillasses - Pompeur 24/7</h2>
      </div>
    </div>
  );
};

export default GasPricePanel; 