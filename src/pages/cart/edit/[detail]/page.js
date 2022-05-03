import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListOptions } from '../../../menu/[detail]/service';
import styles from '../../../menu/[detail]/menuDetail.module.css'
import Image from "next/image";
import { Add, Delete, FavoriteBorder, Remove } from "@mui/icons-material";
import Drawer from '../../../menu/[detail]/components/drawer';
import { setCart } from "../../../../redux/actions/global";
import QuantityController from "../../../../components/QuantityController/page";
import { cloneDeep, isEqual } from "lodash";

export default function EditMenuDetail () {
    const dispatch = useDispatch()
    const router = useRouter();
    const id = router.query.detail
    const cart = useSelector(state => state.global.cart)
    const selectedCart = useSelector(state => state.global.editedCart)
    const [editedCart, setEditedCart] = useState(null)
    const [selectedOptions, setSelectedOptions] = useState({})
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


    useEffect(() => {
        const obj = cloneDeep(selectedCart)
        setEditedCart(obj)
    }, [selectedCart])

    const getListOptionsDispatch = async (name) => {
        try {
          const resp = await dispatch(fetchListOptions(name))
          return resp
        } catch (error) {
          console.log(error);
        }
    }
    

    function getOptions () {
        const options = editedCart.selectedVariant.options
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
        if (editedCart.menuDetail.description) {
            return (
                <>
                    <p className="text">
                    {isReadMore ? editedCart.menuDetail.description.slice(0, 100) : editedCart.menuDetail.description}
                    </p>
                    <span style={{color: "black", fontWeight: "bold"}} onClick={toggleReadMore} className="read-or-hide">
                        {isReadMore ? "read more" : "show less"}
                    </span>                            
                </>
              );
        }
    }

    function updateVariantOption (item) {
        const obj = {...editedCart.selectedVariant}
        obj.options[item.index] = {
            name: item.name,
            default:item.default,
            price: item.price
        }

        const newState = {...editedCart}
        newState.options = obj.options
        newState.selectedVariant = obj
        
        setEditedCart(newState)
    }

    function getTotalPrice () {
        const variantOptions = editedCart.selectedVariant.options
        let totalPrice = editedCart.menuDetail.price
        variantOptions.forEach(el => {
            totalPrice += el.price
        })
        return totalPrice
    }

    function editCart () {
        const newCart = [...cart]
        const newObj = {...editedCart}
        newObj.item_price = getTotalPrice(),
        newObj.totalPrice = getTotalPrice() * editedCart.quantity,
        newCart[id] = newObj
        dispatch(setCart(newCart))
    }

    function setQuantity (newQuantity) {
        const newObj = {...editedCart}
        newObj.quantity = newQuantity
        setEditedCart(newObj)
    }

    if (!editedCart) {
        return (
            <>
                <div>
                    <p>Loading</p>
                </div>
            </>
        )
    }
    return (
        <div className={styles.menuDetailContainer}>
            <div className={styles.menuDetailHeader}>
                <Image id={styles.menuDetailImage} src={`/${editedCart.image_url}`} layout="responsive" height={40} width={50} />
            </div>
            <div className={styles.menuDetailBody}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p style={{fontSize: "10px"}}>{editedCart.menuDetail.category_name}</p>
                    <FavoriteBorder></FavoriteBorder>
                </div>
                <div>
                    <h3>{editedCart.menuDetail.name}</h3>
                </div>
                <div>
                    {editedCart.menuDetail.description ? readMoreReadLess() : ''}
                </div>
                <div>
                    <h3>{editedCart.menuDetail.price}</h3>
                </div>
                {
                    <>
                        <div className={styles.menuVariants}>
                            {                            
                                <div 

                                    className={styles.variant } id={styles.activeVariant} 
                                >
                                    <p>{editedCart.selectedVariant.variant_name.toUpperCase()}</p>
                                </div>
                            }
                        </div>
                        <div className={styles.optionsContainer}>
                            {
                                getOptions()
                            }
                        </div>
                    </>
                }
            </div>
            <div className={styles.containerQuantity}>
                < QuantityController 
                    quantity={editedCart.quantity}
                    setQuantity={setQuantity}
                />
            </div>
            <div className={styles.orderContainer}>
                <div 
                    id={styles.addToCart}
                    onClick={()=> editCart()}
                >
                    Edit cart - {getTotalPrice() * editedCart.quantity}
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