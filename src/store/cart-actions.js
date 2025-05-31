import { createSlice } from 'react-redux'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload
            state.totalQuantity = action.payload.totalQuantity
        },
        addItem(state, action) {
            const newItem = action.payload
            const existingItem = state.items.find((item) => item.id === newItem.id)
            state.totalQuantity++
            state.changed = true

            if (!existingItem) {
                state.items.psuh({
                    totalPrice: newItem.totalPrice,
                    name: newItem.name,
                    quantity: 1,
                    id: newItem.id,
                    price: newItem.price
                })
            }
            else {
                existingItem.totalQuantity++
                existingItem.totalPrice = existingItem.price + newItem.price
            }
        },
        removeItem(state, action) {
            const id = action.payload
            const existingItem = state.items.find((item) => item.id === newItem)
            state.totalQuantity--
            state.changed = true

            if (existingItem.quantity === 1) {
                state.itmes.filter((item) => item.id = id)
            }
            else {
                existingItem.quantity--
                existingItem.totalPrice = existingItem.totalPrice - newItem.price
            }

        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice 