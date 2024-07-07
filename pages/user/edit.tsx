import { useState, useEffect, FormEvent } from "react";
import api from "@/libs/api";
import { TextField, Button, Box, Alert } from "@mui/material";
import { useRouter } from "next/router";

const Edit = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    const password = 'pass02';
    const password_confirmation = 'pass02';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/validate_token');
                setName(response.data.data.name);
                setEmail(response.data.data.email);
            } catch(error) {
                console.log(error);
            }
        }

        fetchUser();
    }, []);

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //フォームのデフォルトの送信動作を止める

        if (email === '' || name === '') {
            setIsError(true);
            setErrorMessage('ユーザー名とメールアドレスを入力してください。');
            return;
        }

        try {
            await api.put('/auth/update_name_and_email', { name, email});
            router.push('/user');
        } catch(error: any) {
            console.log(error);
            setIsError(true);
            setErrorMessage('変更に失敗しました。');
        }
    }

    return (
        <div>
            <Box component="form" onSubmit={handleSave} sx={{ maxWidth: '430px', mx: 'auto' }}>
                <TextField label='ユーザー名' value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
                <TextField label='メールアドレス' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal"/>
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

export default Edit;