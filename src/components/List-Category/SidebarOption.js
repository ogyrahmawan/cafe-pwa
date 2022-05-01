import styles from './style.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function SidebarOption ({
    Icon,
    route,
    name,
}) {
    const router = useRouter()
    return (
        <>
            <div 
                className={`${styles.sidebarOption} ${router.asPath === route ? styles.active: ''}`}
            >
                <div className={styles.categoryContainer}>
                    <Image className={styles.categoryImage} src={`/${Icon}`} alt="" width={50} height={50}/>
                </div>
                <h2>{name}</h2>
            </div>
        </>
    )
}