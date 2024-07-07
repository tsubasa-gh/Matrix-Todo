import { FormEvent, useState } from "react";
import api from "@/libs/api";
import { useRouter } from "next/router";
import { TextField, Button, Box, Typography, Link, Alert } from "@mui/material";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";

const SignUp: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //フォームのデフォルトの送信動作を止める

        if (name === '' || email === '' || password === '' || passwordConfirmation === '') {
            setIsError(true);
            setErrorMessage('全ての項目を入力してください。');
            return;
        }

        if (password.length < 6) {
            setIsError(true);
            setErrorMessage('パスワードは6文字以上で入力してください。');
            return;
        }
        if (password !== passwordConfirmation) {
            setIsError(true);
            setErrorMessage('パスワードが一致しません');
            return;
        }

        try {
            const response = await api.post('/auth', {
                name, email, password, password_confirmation: passwordConfirmation,
            });
            router.push('/About');
        } catch (error) {
            console.error('Registration error:', error);
            setIsError(true);
            setErrorMessage('登録に失敗しました。');
        }
    };

    return (
        <div>
            <Box sx={{ mt: 4, maxWidth: '500px', mx: 'auto' }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ p: 6, bgcolor: '#ffffff', boxShadow: 3, borderRadius: 2 }}>
                    <TextField label='ユーザー名' value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
                    <TextField label='メールアドレス' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
                    <TextField label='パスワード' value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" type="password" helperText="パスワードは6文字以上で入力してください" />
                    <TextField label='パスワード（確認用）' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} fullWidth margin="normal" type="password" helperText="確認のため、もう一度パスワードを入力してください" />
                    <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>新規登録</Button>
                    {isError && (
                        <Box sx={{ mt: 2 }}>
                            <Alert onClose={() => { setIsError(false); setErrorMessage(""); }} severity="error">
                                {errorMessage}
                            </Alert>
                        </Box>
                    )}
                    <Typography align="center" sx={{ mt: 2 }}>
                        登録済みの方は<Link href="/login" sx={{ color: 'primary.dark', textDecoration: 'underline' }}>こちら</Link>
                    </Typography>
                </Box>
            </Box>
        </div>
    );

}

export default SignUp;