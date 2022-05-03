import { useDispatch, useSelector } from "react-redux";
import styles from './styles.module.css';
import Image from 'next/image';
import QuantityController from "../../components/QuantityController/page";
import { setCart, setEditedCart } from "../../redux/actions/global";
import { useRouter } from "next/router";

export default function Cart () {
    const dispatch = useDispatch()
    const cart = useSelector(staate => staate.global.cart);
    const router = useRouter()

    function getOptionString (data) {
        let string = ''
        data.forEach((el, index) => {
            if (index != data.length - 1) {
                string += `${el.default},` 
            } else {
                string += `${el.default}`
            }
        })
        return string
    }

    function updateQuantity (newQuantity, index) {
        const obj = [...cart]
        obj[index].quantity = newQuantity
        obj[index].totalPrice = newQuantity * obj[index].item_price
        dispatch(setCart(obj))
    }

    async function edit (object, index) {
        await dispatch(setEditedCart(object))
        router.push(`/cart/edit/${index}`)
    }
    

    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartItemContainer}>
                <div className={styles.clearCart}>
                    <h5>Batalkan Semua</h5>
                </div>
                {
                    cart.map((each, index) => (
                        <div className={styles.cardCart} key={index}>
                            <div style={{display: 'flex'}}>
                                <div className={styles.cardImage}>
                                    <Image className={styles.cartImage} src={each.image_url} height={150} width={150}/>
                                </div>
                                <div className={styles.cartData}>
                                    <h5>{`${each.variant_name} ${each.menu_name}`}</h5>
                                    <p>{getOptionString(each.options)}</p>
                                    <p className={styles.totalPrice}>Rp {each.totalPrice}</p>
                                </div>
                            </div>
                            <div className={styles.cartAction}>
                                <button onClick={() => edit(each, index)} className={styles.editButton}>Edit</button>
                                <div className={styles.containerQuantity}>
                                    <QuantityController
                                        index={index}
                                        quantity={each.quantity}
                                        setQuantity={updateQuantity}
                                    />

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div 
                id={styles.checkoutButton}
                onClick={() => router.push('/cart/checkout')}
            >
                <h5>CHECKOUT</h5>
            </div>

        </div>
    )
} 