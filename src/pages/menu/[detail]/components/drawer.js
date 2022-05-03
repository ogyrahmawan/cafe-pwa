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
import styles from '../menuDetail.module.css'
import { Radio } from '@mui/material';

const drawerBleeding = 10;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
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
      optionName: '',
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
          <Typography sx={{ p: 2, color: 'text.secondary' }}>{props.options.toUpperCase()}</Typography>
          <div className={styles.optionContainer} >
            {
              props.list?.map(each => (
                <div key={each.id} 
                  className={styles.optionItem}
                  onClick={() => {
                    // update selected option by click state
                    const obj = {...props.optionData}
                    obj.default = each.name
                    obj.price = each.price
                    props.setSelectedOptions(obj)

                    // update variant state
                    props.updateVariantOption(obj)
                  }}  
                >
                  <div
                    style={{display: 'flex', alignItems: 'center'}}
   
                  >
                    <Radio 
                      sx={{
                        color: grey[800],
                        '&.Mui-checked': {
                          color: grey[600],
                        },
                      }}
                      value={props.optionData.default} 
                      checked={each.name === props.optionData.default ? true: false}
                      onChange={() => {
                        // update selected option by click state
                        const obj = {...props.optionData}
                        obj.default = each.name
                        obj.price = each.price
                        props.setSelectedOptions(obj)

                        // update variant state
                        props.updateVariantOption(obj)
                      }}
                    />
                    <h5>{each.name}</h5>
                  </div>
                    <p>+{each.price}</p>
                </div>
              ))
            }
          </div>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}