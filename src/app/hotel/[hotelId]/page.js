"use client"
import { getHotelData } from '@/api/api'
import React, { useEffect, useState } from 'react'
import styles from "./detailed.module.css"

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <div className="loading-container">
                <p>Loading...</p>
                {/* You can add a spinner or other loading animation here */}
            </div>
        </div>
    );
};

function pages({ params }) {
    const [hotelData, setHotelData] = useState();
    const [isLoading, setIsLoading] = useState(true)
    async function fetchHotelData(id) {
        try {
            const response = await getHotelData(id);
            if (response.success === "1") {
                setIsLoading(false)
                setHotelData(response.result)
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchHotelData(params.hotelId);
    }, [])
    if (isLoading) {
        return <LoadingPage />;
    }
    console.log(hotelData);
    return (
        <div className={`${styles.container}  p-0`}>
            <div className=' row d-flex justify-content-between m-4'>
                <div className='col text-start' >
                    <h3 className='text-3xl font-bold'>
                        {hotelData?.name}
                    </h3>
                </div>
                <div className='col text-lg font-bold text-end self-end'>
                    <h5>
                        Room type: {hotelData?.room_type}
                    </h5>
                </div>
            </div>
            <div className='p-3 flex flex-row'>
                <div className="basis-2/4 text-center me-2">
                    <img className='rounded rounded-3 w-full' src={hotelData?.images?.picture_url}></img>
                </div>

                <div className='basis-2/4 me-2'>
                    <div>
                        <h2 className="text-2xl font-semibold">₹ {hotelData?.price.$numberDecimal * 83.31} / Night</h2>
                        <div className='reviews text-start flex flex-row'>
                            <div className='w-50 basis-1/2 mt-3'>
                                <button className='rounded-full bg-red-600 me-2 hover:bg-red-400 p-3 text-white font-extrabold'>Book Now</button>
                                <button className='rounded-full bg-slate-300 hover:bg-red-200 p-3 text-black font-extrabold'>Add to Favourites</button>
                                <div className='mt-2 bg-slate-200 shadow-md p-2 w-75 rounded-md'>
                                    <h5 className='text-xl font-semibold'>Address</h5>
                                    <p>
                                        {hotelData.address.suburb}, {hotelData.address.government_area},<br />
                                        {hotelData.address.market}
                                    </p>
                                </div>
                                <div className='mt-2 bg-slate-200 shadow-md p-2 w-75 rounded-md'>
                                    <h5 className='text-xl font-semibold'>Accommodates:{hotelData.accommodates}
                                    </h5>
                                </div>
                            </div>
                            <ul className={`${styles.review_list} basis-1/2`}>
                                <h4 className='text-xl font-semibold'>Reviews</h4>
                                <li>
                                    <span>Overall review</span>
                                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar bg-danger" style={{ "width": `${(hotelData?.review_scores?.review_scores_rating / 100) * 100}%` }} ></div>
                                    </div>
                                </li>
                                <li>
                                    <span>Check in</span>
                                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar bg-danger" style={{ "width": `${(hotelData?.review_scores?.review_scores_checkin / 10) * 100}%` }} ></div>
                                    </div>
                                </li>
                                <li>
                                    <span>Cleanliness</span>
                                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar bg-danger" style={{ "width": `${(hotelData?.review_scores?.review_scores_cleanliness / 10) * 100}%` }} ></div>
                                    </div>
                                </li>
                                <li>
                                    <span>Communication</span>
                                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar bg-danger" style={{ "width": `${(hotelData?.review_scores?.review_scores_communication / 10) * 100}%` }} ></div>
                                    </div>
                                </li>
                                <li>
                                    <span>Location</span>
                                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar bg-danger" style={{ "width": `${(hotelData?.review_scores?.review_scores_location / 10) * 100}%` }} ></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='mt-2'>
                            <h4 className='text-lg font-semibold'>Amenities</h4>
                            <div className='grid grid-cols-4 gap-2'>
                                {hotelData.amenities.map((data) => {
                                    return (
                                        <div key={data} className='border-none rounded-lg bg-slate-200 hover:bg-slate-400 p-1 text-black shadow-sm text-center'>
                                            {data}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>

    )
}

export default pages