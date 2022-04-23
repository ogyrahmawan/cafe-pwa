import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchListOptions, getMenuDetail } from './service';
import styles from './menuDetail.module.css'
import Image from "next/image";
import { Add, Delete, FavoriteBorder, Remove } from "@mui/icons-material";
import Drawer from './components/drawer';
import { set } from "lodash";

export default function MenuDetail () {
    const dispatch = useDispatch()
    const router = useRouter();
    const id = router.query.detail
    const [menuDetail, setMenuDetail] = useState({})
    const [variant, setVariant] = useState([]);
    console.log(variant, 'isi variant');
    const [selectedVariant, setSelectedVariant] = useState({
        index: 0,
        name: 'iced',
    })
    const [selectedOptions, setSelectedOptions] = useState({})
    const [image, setImage] = useState();
    const [quantity, setQuantity] = useState(1)
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    const [optionDrawer, setOptionDrawer] = useState({
        isVisible: 'hidden',
        optionName: '',
        open: false,
        listOption: []
    })

    useEffect(async () => {
        if (id) {
            await getMenuDetailDispatch()
        }
    }, [id])

    async function getMenuDetailDispatch () {
        try {
            const resp = await dispatch(getMenuDetail(id))
            setMenuDetail(resp.data);
            setVariant(resp.data.variants);
            setImage(resp.data.variants[0].image_url);
        } catch (error) {
            console.log(error)
        }
    }
    const getListOptionsDispatch = async (name) => {
        try {
          const resp = await dispatch(fetchListOptions(name))
          return resp
        } catch (error) {
          console.log(error);
        }
    }
    

    function getOptions () {
        const options = variant[selectedVariant.index].options
        // setOptions(options);
        return <>
            {
                options.map((each, i) => (
                    <div 
                        className={styles.optionBox} 
                        key={i}
                        onClick={async () => {
                            setSelectedOptions({
                                index: i,
                                ...each,
                            })
                            const resp = await getListOptionsDispatch(each.name)
                            setOptionDrawer({
                                isVisible: 'visible',
                                optionName: each.name,
                                open: true,
                                listOption: resp.data
                            })
                        }}
                    >
                        <h3>{each.name.toUpperCase()}</h3>
                        <p >{each.default}</p>
                        <p style={{marginTop: '30px'}}>Rp{each.price}</p>
                    </div>
                ))
            }
        </>
    }

    function readMoreReadLess() {
        if (menuDetail.description) {
            return (
                <>
                    <p className="text">
                    {isReadMore ? menuDetail.description.slice(0, 100) : menuDetail.description}
                    </p>
                    <span style={{color: "black", fontWeight: "bold"}} onClick={toggleReadMore} className="read-or-hide">
                        {isReadMore ? "read more" : "show less"}
                    </span>                            
                </>
              );
        }
    }

    function updateVariantOption (item) {
        const obj = [...variant]
        obj[selectedVariant.index].options[item.index] = {
            name: item.name,
            default:item.default,
            price: item.price
        }
        setVariant(obj)
    }

    return (
        <div className={styles.menuDetailContainer}>
            <div className={styles.menuDetailHeader}>
                <Image id={styles.menuDetailImage} src={`/${image}`} layout="responsive" height={40} width={50} />
            </div>
            <div className={styles.menuDetailBody}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p style={{fontSize: "10px"}}>{menuDetail.category_name}</p>
                    <FavoriteBorder></FavoriteBorder>
                </div>
                <div>
                    <h3>{menuDetail.name}</h3>
                </div>
                <div>
                    {menuDetail.description ? readMoreReadLess() : ''}
                </div>
                <div>
                    <h3>{menuDetail.price}</h3>
                </div>
                {
                    variant && variant.length > 0 ?
                    <>
                        <div className={styles.menuVariants}>
                            {
                                variant.map((each, index) => (
                                    <div 
                                        onClick={() => {
                                            setSelectedVariant({
                                                index: index,
                                                name: each.name,
                                            })
                                            setImage(each.image_url)
                                        }} 
                                        className={styles.variant } id={selectedVariant.index === index ? styles.activeVariant: ''} 
                                        key={each.id}
                                    >
                                        <p>{each.variant_name.toUpperCase()}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.optionsContainer}>
                            {
                                getOptions()
                            }
                        </div>
                    </>
                    :
                    ''
                }
            </div>
            <div className={styles.containerQuantity}>
                <div 
                    className={styles.quantityButton}
                    onClick={() => {
                        if ((quantity-1) >= 1) {
                            const newQuantity = quantity-1
                            setQuantity(newQuantity);
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
                        setQuantity(newQuantity);
                    }}
                >
                    <Add />
                </div>
            </div>
            <div className={styles.orderContainer}>
                <div id={styles.addToCart}>
                    Add to cart - {quantity * menuDetail.price}
                </div>
            </div>
            <Drawer
                isVisible={optionDrawer.isVisible}
                open={optionDrawer.open}
                options={optionDrawer.optionName}
                setOptionDrawer={setOptionDrawer}
                list={optionDrawer.listOption}
                optionData={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                updateVariantOption={updateVariantOption}
            />
        </div>
    )
}