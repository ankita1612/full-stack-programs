import {useCart} from "../context/CartContext"

function Cart() {
    const { cart, grandTotal, clearCart, totalItems } = useCart()


    return (
    <div className="p-4 border rounded-md max-h-[70vh] overflow-auto bg-white">
        {JSON.stringify(cart)}
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Cart</h2>
            <div className="text-sm">Items: <span className="font-semibold">{totalItems}</span></div>
        </div>
        {cart.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
        ) : (<table className="w-full text-left border-separate border-spacing-y-2"> 
                <thead> 
                    <tr><th className="pb-2">Product</th><th className="pb-2">Qty</th><th className="pb-2">Total</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((item) => (
                    <tr key={item.id} className="h-10">
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>₹{(item.qty * item.price).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )}

        <div className="mt-4 border-t pt-4 flex items-center justify-between">
            <div className="font-semibold">Grand Total</div>
            <div className="font-bold">₹{grandTotal.toLocaleString()}</div>
        </div>


        <div className="mt-4 flex gap-2">
            <button onClick={clearCart} className="px-3 py-2 bg-red-500 text-white rounded hover:opacity-90" >  Clear Cart </button>
            <button onClick={() => alert('Checkout not implemented')} className="px-3 py-2 bg-green-600 text-white rounded hover:opacity-90" > Checkout </button>
        </div>
    </div>
    )
}

export default Cart;