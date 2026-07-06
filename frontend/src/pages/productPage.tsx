import { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import {fetchProductById} from '../api/products'

type Product={
    _id : string,
    name: string,
    description: string,
    image: string,
    price: number,
    countInStock: number,
}

function productPage(){
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getProduct = async () => {
            try{
                const data = await fetchProductById(id!);
                setProduct(data)
            }catch(err){
                setError('Product not found')
            } finally {
                setLoading(false)
            }
        }

        getProduct();
    }, [id])

    if(loading) return <p>Loading ... </p>
    if(error) return <p>{error}</p>
    if(!product) return null

    
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          <p>In Stock: {product.countInStock}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default productPage