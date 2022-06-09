import useHttp from '../hooks/use-http';
import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
	const { isLoading, error, sendRequest } = useHttp();
	const [meals, setMeals] = useState([])

	useEffect(() => {
		const appyData = (data) => { 
			const loadedMeals = [];

			for (const tasksKey in data) {
				loadedMeals.push({
					id: tasksKey,
					name: data[tasksKey].name,
					description: data[tasksKey].description,
					price: data[tasksKey].price,
				});
			}
			setMeals(loadedMeals) 
		};

		sendRequest(
			{ url: 'https://mealsbackend-default-rtdb.firebaseio.com/meals.json' },
			appyData,
		);
	}, [sendRequest]);

	const mealsList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				{isLoading ? <p> Awaiting meals</p> : <ul>{mealsList}</ul>}
				{!isLoading && error ? <p>Faild to load meals</p> : ''}
			</Card>
		</section>
	);
};

export default AvailableMeals;
