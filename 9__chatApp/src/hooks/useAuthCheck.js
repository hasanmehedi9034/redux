import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const localAuth = localStorage?.getItem('auth');
        if(localAuth) {
            const auth = JSON.parse(localAuth);
            console.log(auth);
            if(auth?.accessToken) {
                dispatch(userLoggedIn(auth))
            }
        }
        setAuthChecked(true);
    }, [dispatch])

  return authChecked
}
