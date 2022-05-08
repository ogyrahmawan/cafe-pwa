import { useDispatch, useSelector } from "react-redux";
import StandardHeader from "../../../components/Header/StandardHeader";
import style from './style.module.css'
import Cart from "../page";
import PaymentDrawer from "../../../components/PaymentDrawer/PaymentDrawer";
import { useState } from "react";
import { checkout } from "./service";

export default function CheckoutPage () {
    const dispatch = useDispatch()
    const cart = useSelector(staate => staate.global.cart);
    const [optionDrawer, setOptionDrawer] = useState({
        isVisible: 'hidden',
        open: true,
    })

    const [paymentMethod, setPaymentMethod] = useState(null)


    function getTotalQuantity () {
        let quantity = 0
        cart.forEach(item => {
            quantity += item.quantity
        })
        return quantity
    }

    function getTotalPrice () {
        let totalPrice = 0
        cart.forEach(item => {
            totalPrice += item.totalPrice
        })
        return totalPrice
    }

    async function pay () {
        const menus = cart.map(el => {
            const notes = getOptionString(el.options);
            const payload = {
                id_menu: el.id_menu,
                quantity: el.quantity,
                line_amount: el.totalPrice,
                note: notes,
            }
            return payload;
        })
        const payload = {
            total_price: getTotalPrice(),
            order_type: 'DINE IN',
            payment_method: paymentMethod,
            menus,
        }
        try {
            const resp = await dispatch(checkout(payload))
            console.log(resp, 'isi resp')
        } catch (error) {
            console.log(error, 'isi error')
        }
    }

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
    return (
        <div className={style.container}>
            <StandardHeader name={'Konfirmasi Pesanan'}/>
            <div className={style.detailOrderContainer}>
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0px'}}>
                        <h4>Jumlah Pesanan kamu</h4>
                        <p>{getTotalQuantity()}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h4 style={{marginTop: 0}}>Total Pesanan kamu</h4>
                        <p style={{marginTop: 0}}>Rp{getTotalPrice()}</p>
                    </div>
                </div>
            </div>

            <PaymentDrawer 
                isVisible={optionDrawer.isVisible}
                open={optionDrawer.open}
                setOptionDrawer={setOptionDrawer}
                setPaymentMethod={setPaymentMethod}
                paymentMethod={paymentMethod}
                pay={pay}
            />
        </div>
    )
}