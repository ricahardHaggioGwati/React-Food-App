import { useContext } from 'react'

import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon"
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext)

    const numberOfItem = cartCtx.items.reduce((curNummber, item) => {
        return curNummber + item.amount
    }, 0)

    return <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icons}>
            <CartIcon/>
        </span>
        <span>Your Items</span>
    <span className={classes.badge}>{numberOfItem}</span>
    </button>
}

export default HeaderCartButton