import React from "react";

const ProductItem = React.memo(function ProductItem({ product, qty, onAdd, onRemove }) {
return (
    <div className="p-4 border rounded-md flex items-center justify-between">
        <div>
            <div className="font-semibold">{product.name} {"  "}₹{product.price.toLocaleString()}</div>
        </div>
        <div>
            <button aria-label={`remove-${product.id}`} onClick={() => onRemove(product.id)} className="px-3 py-1 border rounded hover:bg-gray-100"> − </button>
            {"  "}<span >{qty}</span>{"  "}
            <button aria-label={`add-${product.id}`} onClick={() => onAdd(product)} className="px-3 py-1 border rounded hover:bg-gray-100"> + </button>
        </div>
    </div>)
})

export default ProductItem;