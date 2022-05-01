import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useDispatch } from 'react-redux';
import styles from './styles.module.css'
import { Radio } from '@mui/material';
import { PointOfSale } from '@mui/icons-material';

const drawerBleeding = 10;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 50,
  height: 5,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 20,
  left: 'calc(50% - 15px)',
}));

export default function SwipeableEdgeDrawer(props) {
  const dispatch = useDispatch()
  const { window } = props;

  const toggleDrawer = (newOpen) => () => {
  };

  const closeDrawer = () => () => {
    props.setOptionDrawer({
      isVisible: 'hidden',
      open: false,
    })
  }
  
  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(60% - ${drawerBleeding}px)`,
            overflow: props.isVisible,
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={props.open}
        onClose={closeDrawer()}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <div className={styles.optionContainer} >
            <h3>Choose Payment</h3>
            <div 
                className={styles.itemContainer}
                onClick={() => {
                    props.setPaymentMethod('Cash')
                }}
            >
                <PointOfSale className={styles.cashierIcon}/>
                <p >Cash</p>
            </div>
            <h5>E-Wallet</h5>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div onClick={() => {
                    props.setPaymentMethod('Gopay')
                }} className={styles.itemContainerEwallet}>
                    <p >Gopay</p>
                </div>
                <div 
                    className={styles.itemContainerEwallet}
                    onClick={() => {
                        props.setPaymentMethod('Shopeepay')
                    }}
                >
                    <p >Shopeepay</p>
                </div>
            </div>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}