import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const notEmpyt = (value) => value.trim() !== '';
const fiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const [formIsValid, setFormIsValid] = useState({
		name: true,
		street: true,
		postal: true,
		city: true,
	});

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostal = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const validName = notEmpyt(enteredName);
		const validStreet = notEmpyt(enteredStreet);
		const validPostal = fiveChar(enteredPostal);
		const validCity = notEmpyt(enteredCity);

		setFormIsValid({
			name: validName,
			street: validStreet,
			postal: validPostal,
			city: validCity,
		});

		if (!setFormIsValid) {
			return;
		}

		props.onOrder({
			name: enteredName,
			street: enteredStreet,
			postal: enteredPostal,
			city: enteredCity,
		});
	};

	const validText = (text) => {
		return <p>{`Please enter a valid ${text}`}</p>;
	};

	const validationClass = (id) => {
		return `${classes.control} ${id ? '' : classes.invalid}`;
	};

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={validationClass(formIsValid.name)}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameInputRef} />
				{!formIsValid.name && validText('name')}
			</div>
			<div className={validationClass(formIsValid.street)}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef} />
				{!formIsValid.street && validText('street')}
			</div>
			<div className={validationClass(formIsValid.postal)}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalInputRef} />
				{!formIsValid.postal && validText('postal code (5 digits)')}
			</div>
			<div className={validationClass(formIsValid.city)}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityInputRef} />
				{!formIsValid.city && validText('city')}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
