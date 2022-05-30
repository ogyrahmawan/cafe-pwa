import { useRouter } from 'next/router';
import style from './layout.module.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useRef } from 'react';
import { AccessTimeFilledRounded, HomeMaxRounded, MenuBookRounded } from '@mui/icons-material';

export default function MainLayout ({children}) {
    const ref = useRef()
    const router = useRouter()
    return (
        <div className={style.container}>
            {children}
            <Box sx={{ pb: 7 }} ref={ref}>
                <CssBaseline />
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                    showLabels
                    >
                        <BottomNavigationAction 
                            label="Menu" 
                            icon={<MenuBookRounded  />}
                            onClick={() => router.push('/')} 
                        />
                        <BottomNavigationAction 
                            label="History" 
                            icon={<AccessTimeFilledRounded  />}
                            onClick={() => router.push('/history')} 
                        />
                    </BottomNavigation>
                </Paper>
            </Box>
        </div>

    )
}