export class OrderModel {
    _id: string;
    status: number;
    totalPrice: number;
    productsId: productsId[];
    products?: OrderProductModel[];
    userId: string;
    date: Date;
}

export class productsId {
    _id: string;
    quantity: number;
}

export class OrderProductModel {
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    price: number;
    isFavorite?: boolean;
    quantity?: number;
}

export class OrderStatusModel {
    name: string;
    value: number;
}