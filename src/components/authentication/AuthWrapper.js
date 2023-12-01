"use client"
import { getValidAuthTokens } from '@/helper/getCookies';
import { logout } from '@/store/features/auth-slice';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoginModal from '../modals/LoginModal';
import { toggleModal } from '@/store/features/modal-slice';

export const AuthWrapper = ({ children }) => {
    const { push } = useRouter();
    const dispatch = useDispatch()
    const { token } = getValidAuthTokens("auth-token");
    useEffect(() => {
        if (!token) {
            dispatch(toggleModal({ isOpen: true }))
            dispatch(logout())
            redirect("/")
        }
    }, [token, push]);

    return children


};