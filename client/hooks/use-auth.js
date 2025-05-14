"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ServerUrl } from '@/lib/urls';
import { getUserClient } from '@/lib/clientAuth';

export function useAuth() {
    const router = useRouter();

    useEffect(() => {
        getUserClient().then((a) => {
            if (!a) {
                router.push(`${ServerUrl}/auth/google`);
            }
        })

    }, []);
}
