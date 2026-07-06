import {Link} from 'react-router-dom'
import green from '../assets/Green.webp'
import red from '../assets/red.png'
import { useState, useEffect } from 'react'
import { fetchProducts } from '../api/products'

type Product = {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  countInStock: number
}


function HomePage(){
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProducts = async () => {
      try{
        const data = await fetchProducts()
        setProducts(data)
      } catch(err){
        setError('Failed to fetch products');
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, []);

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

    return(
        <>
        <style>{
            `
            .carousel-item{
                height: 600px;
            }
            .carousel-item img {
                height: 100%;
                object-fit: cover;
                object-position: center; 
            }
            `}
        </style>

<div id="heroCarousel" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src={green} alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={red} alt="Second slide"/>
    </div>
  </div>
</div>

<section className="product-cards row m-5  d-flex justify-content-around">
 {products.map(product => (
  <Link to={`/products/${product._id}`} key={product._id} style={{ textDecoration: 'none' }}>
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top p-2" src={product.image} alt={product.name} />
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="card-text">{product.description}</p>
        <p><strong>${product.price}</strong></p>
      </div>
    </div>
  </Link>
))}
</section>
        </>
    )
}

export default HomePage