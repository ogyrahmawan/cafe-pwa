import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListOptions, getMenuDetail } from './service';
import styles from './menuDetail.module.css'
import Image from "next/image";
import { Add, Delete, FavoriteBorder, Remove } from "@mui/icons-material";
import Drawer from './components/drawer';
import { setCart } from "../../../redux/actions/global";
import QuantityController from "../../../components/QuantityController/page";
import { isEqual } from "lodash";

export default function MenuDetail () {
    const dispatch = useDispatch()
    const router = useRouter();
    const cart = useSelector(state => state.global.cart)
    const editedCart = useSelector(state => state.global.editedCart)
    const id = router.query.detail
    const [menuDetail, setMenuDetail] = useState({})
    const [variant, setVariant] = useState([]);
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

    useEffect(async () => {
        if (editedCart) {
            setQuantity(editedCart.quantity)
            const indexVariant = variant.findIndex(el => el.id_variant === editedCart.id_variant)
            if(indexVariant !== -1) {
                const variantPayload = {
                    index: indexVariant,
                    name: variant[indexVariant].variant_name
                }
                setSelectedVariant(variantPayload)
                const image = variant[indexVariant].image_url
                setImage(image)
            }
            // const variantClone = [...variant]
            // variantClone[indexVariant].options = editedCart.options
            // setVariant(variantClone)
        }
    }, [editedCart])

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

    function getTotalPrice () {
        if (variant.length > 0) {
            const variantOptions = variant[selectedVariant.index].options
            let totalPrice = menuDetail.price
            variantOptions.forEach(el => {
                totalPrice += el.price
            })
            return totalPrice
        } else {
            return 0
        }
    }

    function addToCart () {
        const newItem = {
            id_menu: menuDetail.id,
            menu_name: menuDetail.name,
            id_variant: variant[selectedVariant.index].id_variant,
            variants: variant,
            variant_name: variant[selectedVariant.index].variant_name,
            options: variant[selectedVariant.index].options,
            item_price: getTotalPrice(),
            totalPrice: getTotalPrice() * quantity,
            image_url: variant[selectedVariant.index].image_url,
            quantity: quantity,
            selectedVariant: variant[selectedVariant.index],
            menuDetail: menuDetail
        }
        const existCart = [...cart]
        let isExistItem = false 
        let indexOfExistItem
        existCart.forEach((el, index) => {
            let isIdentic = isEqual(el.options, newItem.options)
            if(isIdentic && el.id_menu === newItem.id_menu && el.id_variant == newItem.id_variant) {
                isExistItem = true
                indexOfExistItem = index
            }
        })

        if(isExistItem) {
            existCart[indexOfExistItem].quantity += 1
            existCart[indexOfExistItem].totalPrice = existCart[indexOfExistItem].quantity * newItem.item_price
            dispatch(setCart(existCart));
        } else {
            const newData = [...cart, newItem]
            dispatch(setCart(newData));
        }
        
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
                < QuantityController 
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            </div>
            <div className={styles.orderContainer}>
                <div 
                    id={styles.addToCart}
                    onClick={()=> addToCart()}
                >
                    Add to cart - {getTotalPrice() * quantity}
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