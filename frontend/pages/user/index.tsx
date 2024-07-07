import { UserType } from "@/types/User";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/libs/api";
import { Button, CircularProgress, Container, Typography, Box, Dialog, DialogTitle, DialogActions, Card, CardContent, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/validate_token');
                setUser(response.data.data);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                height: '100vh' // 画面全体の高さを指定して中央に配置
            }}>
                <CircularProgress />
            </Box>
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            await api.delete('/auth');
            router.push('/signUp');
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Container maxWidth="sm" sx={{ mt: 9, bgcolor: '#f4f6f8', p: 4, borderRadius: 2, boxShadow: 3 }}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    アカウント
                </Typography>
                <Typography variant="h6" component="p">{user?.name}</Typography>
                <Typography variant="h6" gutterBottom>{user?.email}</Typography>
            </Box>
            <Card sx={{ maxWidth: '500px', width: '100%', mb: 2, mx: 'auto' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body1">ユーザー名・メールアドレス変更</Typography>
                    <IconButton color="primary" onClick={() => { router.push('/user/edit') }} ><EditIcon /></IconButton>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: '500px', width: '100%', mb: 2, mx: 'auto' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body1">パスワード変更</Typography>
                    <IconButton color="primary" onClick={() => { router.push('/user/changePw') }} ><LockIcon /></IconButton>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: '500px', width: '100%', mb: 2, mx: 'auto' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body1">ログアウト</Typography>
                    <IconButton color="primary" onClick={() => { router.push('/logout') }} ><LogoutIcon /></IconButton>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: '500px', width: '100%', mb: 2, mx: 'auto' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body1">アカウント削除</Typography>
                    <IconButton color="error" onClick={handleClickOpen} ><DeleteIcon /></IconButton>
                </CardContent>
            </Card>

            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>本当に削除しますか？</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>いいえ</Button>
                        <Button onClick={handleDelete}>はい</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default UserProfile;