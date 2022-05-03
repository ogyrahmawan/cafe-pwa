import { Card } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import style from './feed.module.css';

export default function Menu ()  {
    const categories = useSelector((state) => state.global.categories);
    const router = useRouter()
    function goToDetail (id) {
        router.push(`/menu/${id}`)
    }
    return (
        <div className={style.menu}>
            {
                categories.map(each => (
                    <div>
                        <div>
                            <h5>{each.name}</h5>
                        </div>
                        <div className={style.listMenu}>
                            {
                                each.menu.map(item => (
                                    <div 
                                        className={style.menuCard}
                                        onClick={() => goToDetail(item.id)}
                                    >
                                        <div>
                                            <Image className={style.menuImage} src={`/${item.image_url}`} alt="" width={125} height={125}/>
                                        </div>
                                        <div style={{height: '40px', marginTop: "0px"}}>
                                            <p style={{fontWeight: "bold"}}>{item.name}</p>
                                        </div>
                                        <div>
                                            <p>{item.price}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                ))
            }
        </div>
    )
}