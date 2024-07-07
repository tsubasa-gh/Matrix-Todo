import React, { useState } from "react";
import { TextField, Button, Box, Alert, Typography, Link } from '@mui/material/';
import { useRouter } from "next/router";
import { setCookie, deleteCookie } from 'cookies-next';
import api from "@/libs/api";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(password, email);

        if (email === '' || password === '') {
            setIsError(true);
            setErrorMessage('メールアドレスとパスワードを入力してください。');
            return;
        }

        try {
            const response = await api.post('/auth/sign_in', { email, password });
            // Cookieにトークンをセット
            setCookie('uid', response.headers['uid']);
            setCookie('client', response.headers['client']);
            setCookie('access-token', response.headers['access-token']);
            router.push('/');
        } catch (error) {
            deleteCookie('uid');
            deleteCookie('client');
            deleteCookie('access-token');
            setIsError(true);
            setErrorMessage('メールアドレスかパスワードが間違っています');
        }
    };

    return (
        <div>
            <Box sx={{ mt: 4, maxWidth: '500px', mx: 'auto' }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ p: 6, bgcolor: '#ffffff', boxShadow: 3, borderRadius: 2 }}>
                    <TextField value={email} fullWidth label="メールアドレス" margin="normal" onChange={(e) => setEmail(e.target.value)} />
                    <TextField value={password} fullWidth label="パスワード" type="password" onChange={(e) => setPassword(e.target.value)} margin="normal" />
                    <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>ログイン</Button>
                    {isError && (
                        <Box sx={{ mt: 2 }}>
                            <Alert onClose={() => { setIsError(false); setErrorMessage(""); }} severity="error">
                                {errorMessage}
                            </Alert>
                        </Box>
                    )}
                    <Typography align="center" sx={{ mt: 2 }}>
                        新規登録の方は<Link href="/signUp" sx={{ color: 'primary.dark', textDecoration: 'underline' }}>こちら</Link>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}

export default Login;
