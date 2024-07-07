//ログイン状態をチェックするカスタムフック

import { useEffect, useState } from "react";
import api from "./api";
import { UserType } from "@/types/User";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<UserType | null>(null);

    const checkAuth = async () => {
        try {
            const response = await api.get('/auth/validate_token');
            setIsAuthenticated(true);
            setUser(response.data.data);
        } catch {
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return { isAuthenticated, loading, user, checkAuth};
}

export default useAuth;