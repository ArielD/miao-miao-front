export class CartModel {
    _id: string;
    title: string;
    description: string;
    price: number;
    quantity?: number;
}

export class LocalStorageCartModel {
    _id: string;
    quantity: number;
}