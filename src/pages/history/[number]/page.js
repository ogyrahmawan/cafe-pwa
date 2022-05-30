import { each } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StandardHeader from "../../../components/Header/StandardHeader";
import { fetchDetailHistory } from "../service";
import styles from './styles.module.css'

export default function DetailHistory () {
    const router = useRouter()
    const dispatch = useDispatch()
    const id = router.query.number

    const [data, setData] = useState({});

    useEffect(async () => {
        if (id) {
            await getDetailTransaction(id)
        }
    }, [id])

    async function getDetailTransaction (id) {
        try {
            const resp = await dispatch(fetchDetailHistory(id))
            setData(resp.data)
        } catch (error) {
            console.log(error, 'isi error')
        }
    }

    function getHeader () {
        if (data.payment_status === 'WAITING-PAYMENT') {
            return {
               image:`/files/payment_waiting.png`,
               headline: `Menunggu Pembayaranmu`,
            } 
        } else if (data.payment_status === 'PAID') {
            return {
                image: '/files/payment_success.png',
                headline: 'Transaksi Berhasil',
            } 
        } else {
            return {
                image: '/files/payment_failed.png',
                headline: 'Transaksi Gagal',
            } 
        }
    }

    return (
        <div className={styles.container}>
            <StandardHeader backlink={'/history'} name={'Detail Pesanan'} />
            <div className={styles.detailTransactionBody}>
                <div className={styles.detailTransactionHeader}>
                    <div>
                        <Image src={getHeader().image} width={210} height={210} />
                        <h3>{getHeader().headline}</h3>
                    </div>
                </div>
                <div>
                    <div style={{marginTop: '20px'}}>
                        <h4 className={styles.marginZero}>No. Pesanan</h4>
                        <p className={styles.marginZero}>{data.order_no}</p>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <h4 className={styles.marginZero}>Tanggal Transaksi</h4>
                        <p className={styles.marginZero}>{data.created_at}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{marginTop: '20px'}}>
                            <h4 className={styles.marginZero}>Status Pemesanan</h4>
                            <p className={styles.marginZero}>{data.order_status}</p>
                        </div>

                        <div style={{marginTop: '20px'}}>
                            <h4 className={styles.marginZero}>Status Pembayaran</h4>
                            <p className={styles.marginZero}>{data.payment_status}</p>
                        </div>
                    </div>

                </div>
                <div className={styles.linesBreak}></div>
                <div style={{marginTop: '30px'}}>
                    <h4>Detail Transaksi</h4>
                    <div>
                        {data.detail?.map(each => (
                            <div key={each.id}>
                                <h5 className={styles.marginZero} style={{fontWeight: 'bold', color: '#1F1F1F'}}>{each.menu_name}</h5>
                                <p className={styles.marginZero}>{each.note}</p>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '0'}}>
                                    <div style={{display: 'flex'}}>
                                        <div className={styles.quantityContainer}>
                                            <p className={styles.marginZero}>{each.quantity}x</p>
                                        </div>
                                        <p className={styles.marginZero}>Rp{each.line_amount / each.quantity}</p>
                                    </div>
                                    <div>
                                        <h5 style={{marginRight: '5px'}} className={styles.marginZero}>Rp{each.line_amount}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.totalContainer}>
                        <h5 className={styles.marginZero}>Total</h5>
                        <h4 className={styles.marginZero}>Rp{data.total_price}</h4>
                    </div>

                    <div className={styles.totalContainer}>
                        <h5 className={styles.marginZero}>Payment Method</h5>
                        <h4 onClick={() => {
                           const link = JSON.parse(data.payment_link).url
                            return window.open(link)
                        }} className={styles.marginZero}>{data.payment_method}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}