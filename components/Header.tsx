import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Skeleton, Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from "next/router";
import useAuth from '@/libs/useAuth';

const Header = () => {
    const [anchorEL, setAnchorEL] = useState<null | HTMLElement>(null);
    const router = useRouter();
    const { isAuthenticated, loading, user, checkAuth } = useAuth();

    useEffect(() => {
        const handleUserUpdate = () => {
            checkAuth();
        };

        window.addEventListener('userUpdate', handleUserUpdate);

        return () => {
            window.removeEventListener('userUpdate', handleUserUpdate);
        };
    }, [checkAuth]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEL(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEL(null);
    }

    const handleLogoutClick = () => {
        router.push('/logout');
    }

    return (
        <header style={{
            display: 'flex', justifyContent: '', alignItems: 'center',
            height: '60px', padding: '0 20px', backgroundColor: '#2196f3', color: '#FFFFFF'
        }}>
            <Link href="/" passHref>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src='/logo.png' style={{ height: '28px', marginRight: '3px' }} />
                    <h1 style={{ fontSize: '24px', margin: 0, cursor: 'pointer' }}>Matrix Todo</h1>
                </div>
            </Link>
            <Box sx={{ ml: 5 }}>
                <Button onClick={() => router.push('/')} sx={{ color: 'white' }}>Todo</Button>
                <Button onClick={() => router.push('/About')} sx={{ color: 'white', }}>About</Button>
                <Button onClick={() => router.push('/user/')} sx={{ color: 'white', }}>Account</Button>
            </Box>
        </header>
    );
};

export default Header;