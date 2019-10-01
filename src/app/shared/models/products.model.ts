export class ProductModel {
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    price: number;
    isFavorite?: boolean;
}