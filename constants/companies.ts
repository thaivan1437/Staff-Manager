interface NameFields {
  atrName: string;
  name: string;
  type: string;
  icon: string;
}

export  const NameFields = [
  { atrName: 'name' , name: 'name', type: 'text', icon: 'FaceIcon' },
  { atrName: 'address' , name: 'address', type: 'text', icon: 'FaceIcon' },
  { atrName: 'intro' , name: 'intro', type: 'text', icon: 'MenuBookIcon' },
  { atrName: 'callLimit' , name: 'callLimit', type: 'number', icon: 'PhoneIcon' },
  { atrName: 'ownedAmount' , name: 'ownedAmount', type: 'number', icon: 'EuroSymbolIcon' },
  { atrName: 'paidAmount' , name: 'paidAmount', type: 'number', icon: 'LocalAtmIcon' },
  { atrName: 'monthLimit' , name: 'monthLimit', type: 'number', icon: 'HourglassEmptyIcon' },
];
