import { useSelector } from "react-redux";
import StandardHeader from "../../../components/Header/StandardHeader";
import style from './style.module.css'
import Cart from "../page";
import PaymentDrawer from "../../../components/PaymentDrawer/PaymentDrawer";
import { useState } from "react";

export default function CheckoutPage () {
    const cart = useSelector(staate => staate.global.cart);
    const [optionDrawer, setOptionDrawer] = useState({
        isVisible: 'hidden',
        open: true,
    })

    const [paymentMethod, setPaymentMethod] = useState(null)
    console.log(paymentMethod, 'isi payment method')


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
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0px'}}>
                        <h4>Payment Method</h4>
                        <p 
                            onClick={() => {
                            setOptionDrawer({
                                isVisible: 'visible',
                                open: true,
                            })
                        }}>{paymentMethod ? paymentMethod : 'Select Payment Method'}</p>
                    </div>                
                </div>
            </div>
            <div 
                id={style.checkoutButton}
                onClick={() => router.push('/cart/checkout')}
            >
                <h5>BAYAR</h5>
            </div>
            <PaymentDrawer 
                isVisible={optionDrawer.isVisible}
                open={optionDrawer.open}
                setOptionDrawer={setOptionDrawer}
                setPaymentMethod={setPaymentMethod}
            />
        </div>
    )
}