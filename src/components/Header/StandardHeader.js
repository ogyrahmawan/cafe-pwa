import style from './header.module.css'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ArrowBackIos } from '@mui/icons-material';

export default function StandardHeader ({name, backlink}) {
    const router = useRouter()
    return (
        <div className={style.feedHeader}>
            <ArrowBackIos onClick={() => router.push(backlink)} className={style.arrowBack} />
            <h2>{name}</h2>
        </div>
    )
}