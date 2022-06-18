import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import useHttp from '../hooks/use-http';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const [order, setOrder] = useState(false);

	const { isLoading, error, sendRequest } = useHttp();
	
	//TODO: handle error and loading state
	console.log(isLoading, error)

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const submitHandler = (userData) => {
		sendRequest(
			{
				url: 'https://mealsbackend-default-rtdb.firebaseio.com/orders.json',
				method: 'POST',
				body: { user: userData, orderedItems: cartCtx.items},
			},
		);
		cartCtx.clearCart()
	};

	const cartItem = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)} //preconfigure the arguments upon execution
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const toggleForm = (event) => {
		event.preventDefault();
		setOrder((prev) => {
			return !prev;
		});
	};

	return (
		<Modal onClick={props.onHide}>
			{cartItem}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{order && <Checkout onOrder={submitHandler} onCancel={props.onHide} />}
			{!order && (
				<div className={classes.actions}>
					<button onClick={props.onHide} className={classes['button--alt']}>
						Close
					</button>
					{hasItems && (
						<button onClick={toggleForm} className={classes['button']}>
							Order
						</button>
					)}
				</div>
			)}
		</Modal>
	);
};

export default Cart;
