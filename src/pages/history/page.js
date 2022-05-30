import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StandardHeader from "../../components/Header/StandardHeader";
import styles from '../history/styles.module.css'
import { fetchHistory } from "./service";

export default function History () {
    const router = useRouter()
    const dispatch = useDispatch()
    const [histories, setHistories] = useState([])

    async function getHistories () {
        try {
            const resp = await dispatch(fetchHistory())
            setHistories(resp.data)
        } catch (error) {
            console.log(error, 'isi error')
        }
    }

    useEffect(() => {
        getHistories()
    }, [])

    return (
        <div className={styles.container}>
        <StandardHeader backlink={'/'} name={'Riwayat Pesanan'} />
        <div className={styles.historyBody}>
            {
                histories.map(el => (
                    <div key={el.id} className={styles.historyCard} onClick={() => {
                        router.push(`/history/${el.id}`)
                    }}>
                        <div className={styles.historyCardDetail}>
                            <h4>{el.order_no}</h4>
                            <p>Diorder pada {el.created_at}</p>
                            <h5 className={styles.historyTotalPrice}>Rp{el.total_price}</h5>

                        </div>
                        <div className={styles.historyCardStatus}>
                            <h5>{el.payment_status}</h5>
                        </div>
                        
                    </div>
                ))
            }
        </div>
        </div>
    )
}