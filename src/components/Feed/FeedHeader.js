import style from './feed.module.css'
import Image from 'next/image';
import staticImage from '../../../public/default_header_image.png'

export default function FeedHeader ({name}) {
    if (name !== 'Profile') {
        return (
            <div className={style.feedHeader}>
                <h2>{name}</h2>
            </div>
        )
    } else {
        return (
            <div className={style.profileHeader}>
                <Image
                    src={staticImage}
                    alt=""
                    height={600}
                    layout="responsive"
                />
                <h2>{name}</h2>
            </div>
        )
    }
}