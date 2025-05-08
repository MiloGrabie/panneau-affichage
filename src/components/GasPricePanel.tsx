import React from 'react';
import './GasPricePanel.css';

interface FuelPrice {
  type: string;
  label: string;
  price: number;
  unit: string;
  className: string;
}

const GasPricePanel: React.FC = () => {
  const fuelPrices: FuelPrice[] = [
    { type: 'S/plomb 95-E10', label: 'S/plomb\n95-E10', price: 1.769, unit: '€/L', className: 'sp95' },
    { type: 'Gazole', label: 'Gazole', price: 1.929, unit: '€/L', className: 'gazole' },
    { type: 'Courant Continu', label: 'Courant\nContinu', price: 0.49, unit: '€/Kw', className: 'courant' },
  ];
 
  return (
    <div className="gas-price-panel">
      <h2 className="panel-title">24/24</h2>
      <div className="price-grid">
        {fuelPrices.map((fuel) => (
          <div key={fuel.type} className="price-item">
            <div className={`fuel-type ${fuel.className}`}>
              {fuel.label}
              <span>{fuel.unit}</span>
            </div>
            <div className="price">
              <span className="price-number">
                {Math.floor(fuel.price).toString().padStart(1, '0')}
              </span>
              <span className="last-digit">
                {(fuel.price % 1).toFixed(3).substring(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GasPricePanel; 