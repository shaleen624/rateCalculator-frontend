export const nestedFieldsSample = [{ name: 'type', label: 'Type', type: 'text', required: true , editing: true},
{ name: 'rate', label: 'Rate', type: 'number', required: true , editing: true},
{ name: 'qty', label: 'Qty', type: 'number', required: true , editing: true},
{ name: 'unit', label: 'Unit', type: 'text', required: false , editing: true},
{ name: 'total', label: 'Total', type: 'number', required: false , editing: true}]

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
        { name: 'total', label: 'Total', type: 'number', required: false }
      ]
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
        { name: 'total', label: 'Total', type: 'number', required: false }
      ]
    },
  ];