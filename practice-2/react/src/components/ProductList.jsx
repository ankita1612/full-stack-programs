import React from 'react'
import ProductItem from "./ProductItem"

const ProductList = () => {
    const products = [
        { id: 1, name: "Laptop", price: 55000 },
        { id: 2, name: "Smartphone", price: 25000 },
        { id: 3, name: "Headphones", price: 1500 },
        { id: 4, name: "Keyboard", price: 700 },
        { id: 5, name: "Mouse", price: 500 },
        { id: 6, name: "Smartwatch", price: 4500 },
        { id: 7, name: "Monitor", price: 9000 },
        { id: 8, name: "Speaker", price: 1200 },
        { id: 9, name: "USB Cable", price: 150 },
        { id: 10, name: "Power Bank", price: 1600 }
    ];

  return (
    <>
        <div className="container">
            <div className="bd-example">
            
            <ul>
            {products.map((i)=>{
               return <ProductItem key={i.id} product={i} />

            })}
            </ul>
            </div>
        </div>
    </>
  )
}
export default ProductList;