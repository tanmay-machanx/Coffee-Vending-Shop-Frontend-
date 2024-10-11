'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {

        const token = Cookies.get('jwt');

        if (!token) {
            router.push('/login');
        }

    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;
