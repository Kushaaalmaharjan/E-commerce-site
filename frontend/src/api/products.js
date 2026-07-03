import axios from 'axios';

const BASE_URL = 'http://;ocalhost:3000/api/';

export const getProducts = async () => {
    const {data} = await axios.get(`${BASE_URL}/products`);
    return data;
}

export const fetchProductById = async (id) => {
    const {data} = await axios.get(`${BASE_URL}/products/${id}`);
    return data;
}