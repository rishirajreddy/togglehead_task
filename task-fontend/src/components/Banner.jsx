import { useEffect, useState } from 'react'
import { getBanners } from '../apis/banner'
// import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { baseUrlImage } from './../constant/contant';
import { Link } from 'react-router-dom';
import {Autoplay} from "swiper/modules"
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {

    const [banners, setBanners] = useState([])
    const getBannersApi = async () => {
        try {
            const res = await getBanners();
            console.log(res.data.data)
            setBanners(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    // const swiper = new Swiper('.swiper', {
    //     // Optional parameters
    //     direction: 'horizontal',
    //     autoplay: true,
    //     loop: true,


    //     // If we need pagination
    //     pagination: {
    //         el: '.swiper-pagination',
    //     },

    //     // Navigation arrows
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },

    //     // And if we need scrollbar
    //     scrollbar: {
    //         el: '.swiper-scrollbar',
    //     },
    // });

    useEffect(() => {
        getBannersApi()
    }, [])

    return (
        <div className="swiper h-[500px] w-[1100px]">
            {<Swiper 
            modules={[Autoplay]}
            className="swiper-wrapper">
                {banners?.map((item) => {
                    return <SwiperSlide key={item._id} >
                    <div className='swiper-slide'>
                        <div className='absolute bottom-20 left-20 flex gap-2 flex-col'>
                            <h2 className='font-bold text-white text-3xl'>{item?.title}</h2>
                            <p className='text-white'>{item?.description}</p>
                            <Link to={item?.redirect_url} className='bg-blue-500 text-white p-1 px-3 rounded shadow w-fit font-medium'>Call to action</Link>
                        </div>
                        <img src={baseUrlImage + item?.image_url} className='w-full h-full' />
                    </div>
                    </SwiperSlide>
                })}
            </Swiper>}
        </div>
    )
}

export default Banner
