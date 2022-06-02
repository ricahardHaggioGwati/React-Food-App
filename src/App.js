import {  useState } from "react";
import Meals from "./components/Meals/Meals";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
	const [showCart, setShowCart] = useState(false)

	const viewCartHandler = () => {
		setShowCart(true)
	}

	const hideCartHnadler = () => {
		setShowCart(false)
	}

	return (
		<CartProvider>
			{showCart && <Cart onHide={hideCartHnadler} />}
			<Header onShow={viewCartHandler}/>
			<main>
				<Meals/>
			</main>
		</CartProvider>
	);
}

export default App;
