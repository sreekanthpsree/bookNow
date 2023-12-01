"use client"
import { AuthWrapper } from '@/components/authentication/AuthWrapper'
import { useAuthContext } from '@/store/context/AuthContextProvider'
import Link from 'next/link'
import React, { useState } from 'react'

function Profile() {
    const [userData, setUserData] = useAuthContext();
    const initialEditStatus = {
        name: false,
        email: false,
        number: false,
    }
    const [editStatus, setEditStatus] = useState(initialEditStatus);
    async function handleEditStatus(e) {
        const { id } = e.target
        setEditStatus({ ...editStatus, [id]: !editStatus[id] })
    }
    return (
        <AuthWrapper>
            <div className='m-5 flex flex-row justify-between text-gray-700'>
                <div className='flex-none mt-5 p-5 pt-0 ps-2'>
                    <div className='shadow-md rounded-md border-0 p-3 ps-1 text-start'>
                        <h4 className='text-2xl font-extrabold'>Hello {userData?.username}</h4>
                    </div>
                    <div className='shadow-md p-3 ps-1 rounded-md'>
                        <div className='mt-2'>
                            <Link rows="5" href={"#"} value={userData?.address} className='block w-full text-x' >Favourites</Link>
                        </div>
                        <div className='mt-2'>
                            <Link rows="5" href={"#"} value={userData?.address} className='block w-full text-x' >Bookings</Link>
                        </div>
                        <div className='mt-2'>
                            <Link rows="5" href={"#"} value={userData?.address} className='block w-full text-x' >Address</Link>
                        </div>
                        <div className='mt-2'>
                            <Link rows="5" href={"#"} value={userData?.address} className='block w-full text-x' >Saved Cards</Link>
                        </div>
                    </div>
                </div>
                <div className="border-0 rounded-lg p-1 bg-red-500 ms-4 me-4 h-96"></div>
                <div className='flex-1 mt-5 text-start shadow-md p-3 ps-1 rounded-md'>
                    <h4 className='text-3xl font-extrabold'>Personal Information</h4>
                    <div className='flex w-50 flex-col mt-4'>
                        <div className='flex flex-col mb-4'>
                            <label className='font-semibold' id='name' htmlFor='name'>Full Name <Link href={"#"} id="name" onClick={handleEditStatus} className='ms-1  text-blue-500 font-semibold'>Edit</Link></label>
                            <div className='flex flex-row'>
                                <input value={userData?.name} name='name' disabled={!editStatus.name} className='disabled:bg-slate-300 disabled:opacity-100 block w-full rounded-md border-0 py-1.5 pl-1  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2' />
                                {editStatus.name && <button className='ms-2 bg-blue-600 p-2 rounded-md text-white'>Save</button>}
                            </div>
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label className='font-semibold' htmlFor='email'>Email <Link href={"#"} id="email" className=' ms-1 text-blue-500 font-semibold' onClick={handleEditStatus}>Edit</Link></label>
                            <div className='flex flex-row'>
                                <input value={userData?.email} disabled={!editStatus.email} id='email' className='disabled:bg-slate-300 disabled:opacity-100 block w-full rounded-md border-0 py-1.5 pl-1  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2' />
                                {editStatus.email && <button className='ms-2 bg-blue-600 p-2 rounded-md text-white'>Save</button>}
                            </div>
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label className='font-semibold' htmlFor='number'>Phone Number <Link href={"#"} id='number' className='ms-1 text-blue-500 font-semibold' onClick={handleEditStatus}>Edit</Link></label>
                            <div className='flex flex-row'>
                                <input value={userData?.number} disabled={!editStatus.number} id='number' className='disabled:bg-slate-300 disabled:opacity-100 block w-full rounded-md border-0 py-1.5 pl-1  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2' />
                                {editStatus.number && <button className='ms-2 bg-blue-600 p-2 rounded-md text-white'>Save</button>}

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </AuthWrapper>
    )
}

export default Profile