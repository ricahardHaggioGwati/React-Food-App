import { Fragment } from 'react';
import classes from './Header.module.css';
import mealsImage from '../../assests/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
	return (
		<Fragment>
			<header className={classes.header}>
				<h2>React meals</h2>
				<HeaderCartButton/>
			</header>
			<div className={classes['main-img']}>
				<img src={mealsImage} alt='Table full of delicious meals' />
			</div>
		</Fragment>
	);
};

export default Header;
