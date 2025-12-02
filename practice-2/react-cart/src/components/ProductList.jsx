import { useReducer,useContext,useMemo ,useCallback, useEffect } from "react"
import {useCart} from "../context/CartContext"
import PRODUCTS from "../productsData"
import ProductItem from "./ProductItem"
function ProductList() {
const { cart, addToCart, removeFromCart } = useCart()


// map product id -> qty for O(1) lookup and stable reference
const qtyMap = useMemo(() => {
    const m = new Map()
    cart.forEach((i) => m.set(i.id, i.qty))
    return m
}, [cart])


return (
    <div>
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <div className="grid gap-3">
            {PRODUCTS.map((p) => (
                <ProductItem key={p.id}  product={p}  qty={qtyMap.get(p.id) || 0}  onAdd={addToCart}  onRemove={removeFromCart} />
            ))}
        </div>
    </div>)
}
export default ProductList