import { useContext, useState, useEffect } from 'react'

import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon"
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
    const [btnBump, setBtnBump] = useState(false)
    const cartCtx = useContext(CartContext)
    
    const { items } = cartCtx
    
    const numberOfItem = items.reduce((curNummber, item) => {
        return curNummber + item.amount
    }, 0)


    const btnClass = `${classes.button} ${btnBump ? classes.bump : '' }`

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnBump(true)

        const timer = setTimeout(() => {
            setBtnBump(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }

    }, [items])

    return <button className={btnClass} onClick={props.onClick}>
        <span className={classes.icons}>
            <CartIcon/>
        </span>
        <span>Your Items</span>
    <span className={classes.badge}>{numberOfItem}</span>
    </button>
}

export default HeaderCartButton