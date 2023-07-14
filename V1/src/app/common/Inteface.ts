export interface Product {
    _id: string;
    name: string;
    size: string;
    category: string;
    cutting: string;
    stitching: string;
    finishing: string;
    printEmb: string;
    eyeNose: string;
    bow: string;
    packing: string;
    chainLock: string;
    overhead: string;
    others: string;
    totalPrice: number;
    fabric: Fabric[];
    fiber: Fiber[];
  }
  
  export interface Fabric {
    type: string;
    rate: number;
    qty: number;
    unit: string;
    total: number;
  }
  
  export interface Fiber {
    type: string;
    rate: number;
    qty: number;
    unit: string;
    total: number;
  }
  