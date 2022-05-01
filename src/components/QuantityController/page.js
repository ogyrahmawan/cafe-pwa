import styles from './style.module.css'
import { Add, Delete, FavoriteBorder, Remove } from "@mui/icons-material";


export default function QuantityController ({
    quantity,
    setQuantity,
    index,
}) {
    return (
        <>
            <div 
                className={styles.quantityButton}
                onClick={() => {
                    if ((quantity-1) >= 1) {
                        const newQuantity = quantity-1
                        setQuantity(newQuantity, index);
                    }
                }}
            >
                {
                    quantity <= 1 ?
                    <Delete />
                    :
                    <Remove />
                }
            </div>
            <div className={styles.quantityButton} id={styles.quantity}>
                <p>{quantity}</p>
            </div>
            <div 
                className={styles.quantityButton}
                onClick={() => {
                    const newQuantity = quantity + 1
                    setQuantity(newQuantity, index);
                }}
            >
                <Add />
            </div>
        </>
    )
}