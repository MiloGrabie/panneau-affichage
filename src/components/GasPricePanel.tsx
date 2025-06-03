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
    { type: 'S/plomb 95-E10', label: 'POMPE 1', price:   1.896, unit: 'S/PLOMB 95-E10', className: 'sp95' },
    { type: 'Gazole', label: 'POMPE 2', price: 0.694, unit: 'MAZOUTE', className: 'gazole' },
    { type: 'Courant Continu', label: 'POMPE 3', price: 1.765, unit: 'GAZOLE', className: 'courant' },
  ];
 
  return (
    <div className="gas-price-panel">
      <h2 className="panel-title">Tarifs - Pompe 24/7</h2>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GasPricePanel; 