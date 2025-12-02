import { useReducer,useContext,useMemo ,useCallback, useEffect, createContext } from "react"
import cartReducer from "./cartReducer"
const CartContext = createContext(null)


export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used inside CartProvider')
        return ctx
}


export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
    // lazy init from localStorage
    try {
        const raw = localStorage.getItem('cart_v1')
        return raw ? JSON.parse(raw) : []
    } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
        return []
    }
})


// Persist cart to localStorage
useEffect(() => {
    try {
        localStorage.setItem('cart_v1', JSON.stringify(cart))
    } catch (e) {
        console.error('Failed to save cart', e)
    }
}, [cart])


const addToCart = useCallback((product) => dispatch({ type: 'ADD', payload: product }), [])
const removeFromCart = useCallback((productId) => dispatch({ type: 'REMOVE', payload: productId }), [])
const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])


const totalItems = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart])
const grandTotal = useMemo(() => cart.reduce((s, i) => s + i.qty * i.price, 0), [cart])


// Memoize context value so consumers only update when one of these changes
const value = useMemo(() => ({ cart, addToCart, removeFromCart, clearCart, totalItems, grandTotal }),
    [cart, addToCart, removeFromCart, clearCart, totalItems, grandTotal])
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}