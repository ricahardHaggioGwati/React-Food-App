import { useReducer } from 'react';
import CartContext from './cart-context';

const deafultCartState = {
	item: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'Add') {
		const updatedItem = state.items.concat(action.item); //return a new arry
		const updatedAmount =
			state.totalAmount + action.item.price * action.item.amount;
		return {
			item: updatedItem,
			totalAmount: updatedAmount,
		};
	}
	return deafultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		deafultCartState,
	);

	const addItemHandler = (item) => {
		dispatchCartAction({ type: 'ADD', item: item });
	};

	const removeItemHandler = (id) => {
		dispatchCartAction({ type: 'REMOVE', id: id });
	};

	const cartContext = {
		items: cartState.item,
		totalAmount: cartState.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
