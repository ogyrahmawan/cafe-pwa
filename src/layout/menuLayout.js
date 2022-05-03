import FeedHeader from "../components/Feed/FeedHeader";
import ListCategory from "../components/List-Category";
import style from '../styles/Home.module.css';
import routes from '../routes';
import { useRouter } from "next/router";

export default function MenuLayout ({ children }) {
    const router = useRouter()
    const selectedRoute = routes.filter(route => route.path == router.pathname)[0]
    return (
        <>
            <ListCategory />
            <div className={style.feed}>
                <FeedHeader name={selectedRoute ? selectedRoute.name : 'Page Not Found'}/>
                { children }
            </div>
        </>
    )
}