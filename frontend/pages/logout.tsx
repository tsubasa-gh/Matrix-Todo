import { useRouter } from "next/router";
import axios from "axios";
import { deleteCookie } from 'cookies-next';
import { useEffect } from "react";
import api from "@/libs/api";
import { Box, CircularProgress } from "@mui/material";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                await api.delete('/auth/sign_out');

                deleteCookie('uid');
                deleteCookie('client');
                deleteCookie('access-token');

                //ヘッダーでユーザーログイン状態を再取得するためにカスタムイベント発火
                const event = new Event('userUpdate');
                window.dispatchEvent(event);

                router.push('/login');
            } catch (error) {
                router.push('/login');
            }
        }

        logout();
    }, [])

    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            height: '100vh' // 画面全体の高さを指定して中央に配置
        }}>
            <CircularProgress />
        </Box>
    );
}

export default Logout;