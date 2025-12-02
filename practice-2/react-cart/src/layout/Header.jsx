import {useCart} from "../context/CartContext"

function Header() {
const { totalItems } = useCart()
    return (
    <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mini Shopping Cart</h1>
        <div className="relative">
            <button className="px-3 py-1 border rounded">Cart</button>
            {totalItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-center text-sm leading-6">
            {totalItems}
            </div>
            )}
        </div>
    </div>
)
}
export default Header