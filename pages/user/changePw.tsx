import { useState, useEffect, FormEvent } from "react";
import api from "@/libs/api";
import { TextField, Button, Box, Alert } from "@mui/material";
import { useRouter } from "next/router";

const ChangePw = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const router = useRouter();

    const handleChangePw = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //フォームのデフォルトの送信動作を止める

        if (currentPassword === '' || newPassword === '' || newPasswordConfirmation ==='') {
            setIsError(true);
            setErrorMessage('全ての項目を入力してください。');
            return;
        }
        if (newPassword.length < 6) {
            setIsError(true);
            setErrorMessage('パスワードは6文字以上で入力してください。');
            return;
        }
        if (newPassword !== newPasswordConfirmation) {
            setIsError(true);
            setErrorMessage('パスワードが一致しません');
            return;
        }

        try {
            await api.put('/auth/password', { 
                current_password: currentPassword, 
                password: newPassword, 
                password_confirmation: newPasswordConfirmation, });
            router.push('/login');
        } catch (error) {
            console.log(error);
            setIsError(true);
            setErrorMessage('変更に失敗しました。');
        }
    }

    return (
        <div>
            <Box component="form" onSubmit={handleChangePw} sx={{ maxWidth: '430px', mx: 'auto' }}>
                <TextField label='現在のパスワード' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth margin="normal" type="password"
                />
                <TextField 
                    label='新しいパスワード' 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    fullWidth type="password"
                    margin="normal" helperText="パスワードは6文字以上で入力してください"
                />
                <TextField 
                    label='新しいパスワード（確認用）' 
                    value={newPasswordConfirmation} 
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                    fullWidth 
                    margin="normal"  type="password" helperText="確認のため、もう一度パスワードを入力してください" 
                />
                <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>変更</Button>
            </Box>
            {isError ? (
                <Box sx={{ maxWidth: '430px', mx: 'auto', mt: 2 }}>
                    <Alert onClose={() => { setIsError(false); setErrorMessage(""); }} severity="error">
                        {errorMessage}
                    </Alert>
                </Box>
            ) : null}
        </div>
    );
}

export default ChangePw;