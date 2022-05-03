import styles from './style.module.css';
import SidebarOption from './SidebarOption';
import { Home, Message, Person } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategories } from './service';
import { useEffect } from 'react';

export default function ListCategory () {
    const categories = useSelector((state) => state.global.categories);
    const dispatch = useDispatch()
    const getListCategoriesDispatch = async () => {
        try {
            await dispatch(getListCategories())
        } catch (error) {
            console.log(error, 'isi error');
        }
    }

    useEffect(() => {
        getListCategoriesDispatch()
    }, [])

    return (
        <div className={styles.sidebar}>
            <SidebarOption Icon={Home} />
            {
                categories.map(each => (
                    <SidebarOption key={each.id} Icon={each.icon} name={each.name} />
                ))
            }
        </div>
    )
}