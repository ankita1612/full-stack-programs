function cartReducer(state, action) {
switch (action.type) {
    case 'INIT':
        return action.payload || []
    case 'ADD': {
        const product = action.payload
        const exists = state.find((i) => i.id === product.id)
        if (!exists) return [...state, { ...product, qty: 1 }]
        return state.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
    }
    case 'REMOVE': {
        const id = action.payload
        const target = state.find((i) => i.id === id)
        if (!target) return state
        if (target.qty > 1) return state.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        // qty === 1 -> remove
        return state.filter((i) => i.id !== id)
    }
    case 'CLEAR':
        return []
    default:
        return state
    }
}
export default cartReducer;