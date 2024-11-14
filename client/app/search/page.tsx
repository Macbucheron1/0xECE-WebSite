"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SearchPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, [router]);

    return null;
};

export default SearchPage;