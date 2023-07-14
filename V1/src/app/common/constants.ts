export const BASE_URL = "https://rc-dev.fluffpandastore.com";
//export const BASE_URL = "http://52.77.95.53:3000";
//export const BASE_URL = 'http://localhost:3000';

export const nestedFieldsSample = [
  { name: 'type', label: 'Type', type: 'text', required: true, editing: true },
  {
    name: 'rate',
    label: 'Rate',
    type: 'number',
    required: true,
    editing: true,
  },
  { name: 'qty', label: 'Qty', type: 'number', required: true, editing: true },
  { name: 'unit', label: 'Unit', type: 'text', required: false, editing: true },
  {
    name: 'total',
    label: 'Total',
    type: 'number',
    required: false,
    editing: true,
  },
];

export const formConfigMock = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'size', label: 'Size', type: 'text', required: true },
  { name: 'category', label: 'Category', type: 'text', required: true },

  { name: 'cutting', label: 'Cutting', type: 'text', required: false },
  { name: 'stitching', label: 'Stitching', type: 'text', required: false },
  { name: 'finishing', label: 'Finishing', type: 'text', required: false },
  { name: 'printEmb', label: 'Print/Emb', type: 'text', required: false },
  { name: 'eyeNose', label: 'Eye+Nose', type: 'text', required: false },
  { name: 'bow', label: 'Bow', type: 'text', required: false },
  { name: 'packing', label: 'Packing', type: 'text', required: false },
  { name: 'chainLock', label: 'Chain Lock', type: 'text', required: false },
  { name: 'overhead', label: 'Overhead', type: 'text', required: false },
  { name: 'others', label: 'Others', type: 'text', required: false },
  { name: 'totalPrice', label: 'Total Price', type: 'text', required: false },
  {
    name: 'fabric',
    label: 'Fabric',
    type: 'nested',
    fields: [
      { name: 'type', label: 'Type', type: 'text', required: true },
      { name: 'rate', label: 'Rate', type: 'number', required: true },
      { name: 'qty', label: 'Qty', type: 'number', required: true },
      { name: 'unit', label: 'Unit', type: 'text', required: false },
      { name: 'total', label: 'Total', type: 'number', required: false },
    ],
  },
  {
    name: 'fiber',
    label: 'Fiber',
    type: 'nested',
    fields: [
      { name: 'type', label: 'Type', type: 'text', required: true },
      { name: 'rate', label: 'Rate', type: 'number', required: true },
      { name: 'qty', label: 'Qty', type: 'number', required: true },
      { name: 'unit', label: 'Unit', type: 'text', required: false },
      { name: 'total', label: 'Total', type: 'number', required: false },
    ],
  },
];

export const ADD_PRODUCT_MOCK = {
  name: 'Fur Teddy',
  size: 'Medium',
  category: 'Teddy',
  fabric: [
    {
      type: 'Fabric',
      rate: 10,
      qty: 2,
      unit: 'Meters',
      total: '',
    },
  ],
  fiber: [
    {
      type: 'Fiber',
      rate: 5,
      qty: 3,
      unit: 'Kilograms',
      total: 15,
    },
  ],
  cutting: '10',
  stitching: '10',
  finishing: '10',
  printEmb: '10',
  eyeNose: '15',
  bow: '5',
  packing: '5',
  chainLock: '5',
  overhead: '5',
  others: '0',
  totalPrice: '',
};
