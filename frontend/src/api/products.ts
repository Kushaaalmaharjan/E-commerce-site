import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const fetchProducts = async (): Promise<any[]> => {
    const {data} = await axios.get(`${BASE_URL}/products`);
    return data;
}

export const fetchProductById = async (id: string): Promise<any> => {
    const {data} = await axios.get(`${BASE_URL}/products/${id}`);
    return data;
}