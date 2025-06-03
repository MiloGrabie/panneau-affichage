const fuelPrices = [
    { type: 'S/plomb 95-E10', label: 'POMPE 1', price: 1.896, unit: 'S/PLOMB 95-E10', className: 'sp95' },
    { type: 'Gazole', label: 'POMPE 2', price: 0.694, unit: 'MAZOUTE', className: 'gazole' },
    { type: 'Courant Continu', label: 'POMPE 3', price: 1.765, unit: 'GAZOLE', className: 'courant' },
];

function createPriceItem(fuel) {
    const priceItem = document.createElement('div');
    priceItem.className = 'price-item';

    const fuelType = document.createElement('div');
    fuelType.className = `fuel-type ${fuel.className}`;
    fuelType.innerHTML = `
        ${fuel.label}
        <span style="font-size: 0.8rem">${fuel.unit}</span>
    `;

    const price = document.createElement('div');
    price.className = 'price';
    price.innerHTML = `
        <span class="price-number">${fuel.price}</span>
        <span class="last-digit"></span>
    `;

    priceItem.appendChild(fuelType);
    priceItem.appendChild(price);
    return priceItem;
}

function initializePricePanel() {
    const priceGrid = document.getElementById('priceGrid');
    fuelPrices.forEach(fuel => {
        const priceItem = createPriceItem(fuel);
        priceGrid.appendChild(priceItem);
    });
}

// Initialiser le panneau au chargement de la page
document.addEventListener('DOMContentLoaded', initializePricePanel); 