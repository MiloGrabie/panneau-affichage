// This component is designed to be displayed on a TV screen, showing only gas prices and messages
// No interactive elements should be added as it's meant for display-only purposes
import React from 'react';
import './GasPricePanel.css';

interface FuelPrice {
  type: string;
  label: string;
  price: number;
  unit: string;
  className: string;
}

interface Message {
  author: string;
  text: string;
  timestamp: number;
}

interface GasPricePanelProps {
  messages: Message[];
}

const GasPricePanel: React.FC<GasPricePanelProps> = ({ messages }) => {
  const fuelPrices: FuelPrice[] = [
    { type: 'S/plomb 95-E10', label: 'S/PLOMB 95-E10', price:   1.896, unit: 'VODKA / POMME', className: 'sp95' },
    { type: 'Gazole', label: 'MAZOUTE', price: 0.694, unit: 'WHISKEY / COCA', className: 'gazole' },
    { type: 'Courant Continu', label: 'POMPE 3', price: 1.765, unit: 'VODKA / PECHE', className: 'courant' },
  ];
 
  return (
    <div className="gas-price-panel">
      <div className="panel-header">
        <h2 className="panel-title">Tarifs - Pompe 24/7</h2>
      </div>
      <div className="price-grid">
        {fuelPrices.map((fuel) => (
          <div key={fuel.type} className="price-item">
            <div className={`fuel-type ${fuel.className}`}>
              {fuel.label}
              <span style={{ fontSize: '0.8rem' }}>{fuel.unit}</span>
            </div>
            <div className="price">
              <span className="price-number">
                {fuel.price}
              </span>
              <span className="last-digit">
                {}
              </span>
            </div>
          </div>
        ))}
      </div>
      <footer className="price-footer">
        <div className="marquee-container">
          <div className="marquee">
            {messages.map((message, index) => (
              <span key={index} className="message">
                <strong>{message.author} :</strong> {message.text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GasPricePanel; 