import style from './feed.module.css'
import Image from 'next/image';
import staticImage from '../../../public/default_header_image.png'
import { ShoppingBag } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export default function FeedHeader ({name}) {
    const router = useRouter()
    const cart = useSelector(state => state.global.cart)
    return (
        <div className={style.feedHeader}>
            <h2>{name}</h2>
            <div className={style.shoppingCart}>
                <ShoppingBag 
                    onClick={() => {
                        router.push('/cart');
                    }}
                />
                <span>{cart.length}</span>
            </div>
        </div>
    )
}