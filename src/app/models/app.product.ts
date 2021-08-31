
export interface Product{
    id: string;
    category: string;
    title: string;
    price: string;
    imageUrl: string;
}
export interface ProductId extends Product{
    id: string;
}