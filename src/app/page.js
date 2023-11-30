"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard/BlogCard";
import { hasCookie } from 'cookies-next';

import { getHotels } from "@/api/api";
function HomePage() {
    useEffect(() => {
        fetchHotels();
        if (hasCookie('auth-token')) {
            console.log("got cookie");
        } else {
            console.log("no cookie");
        }
    }, []);
    const [hotels, setHotels] = useState();
    async function fetchHotels() {
        try {
            const data = await getHotels();
            if (data.success === "1") {
                setHotels(data.result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {/* <Header className="sticky-top mt-3" /> */}

            <div className="m-5 p-3 grid grid-cols-4 gap-1">
                {hotels &&
                    hotels.map((hotel) => {
                        return <BlogCard key={hotel._id} data={hotel} />;
                    })}
            </div>

        </>
    );
}

export default HomePage;
