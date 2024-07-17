/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { getBanners } from '../apis/banner'
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { baseUrlImage } from './../constant/contant';
import { Link } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {

    const [banners, setBanners] = useState([])
    const getBannersApi = async () => {
        try {
            const res = await getBanners();
            
            setBanners(res?.data?.data)
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
        <div className=" h-[500px] w-full">
            {/* {banners.length && <div className="swiper-wrapper">
                {banners.length && banners?.map((item) => {
                    return <div key={item._id} className='swiper-slide'>
                        <div className='absolute bottom-20 left-20 flex gap-2 flex-col'>
                            <h2 className='font-bold text-white text-3xl'>{item?.title}</h2>
                            <p className='text-white'>{item?.description}</p>
                            <Link to={item?.redirect_url} className='bg-blue-500 text-white p-1 px-3 rounded shadow w-fit font-medium'>Call to action</Link>
                        </div>
                        <img src={baseUrlImage + item?.image_url} className='w-full h-full' />
                    </div>
                })}
            </div>} */}
            {banners !== null ? (
        <Carousel
          autoPlay
          // stopOnHover
          swipeable={false}
          infiniteLoop
          showArrows
          useKeyboardArrows
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
        //   onClickItem={onClickItem}
          interval={3000}
        >
          {banners?.map((item) => {
            console.log(item)
            return (
              <div key={item.id} className="cursor-pointer">
                <div className="hidden lg:block">
                  <img
                    src={baseUrlImage + item?.image_url}
                    className="h-full w-full lg:aspect-auto cursor-pointer"
                  />
                   <p className="legend text-black">{item?.title}</p>
                </div>
                <div className="block lg:hidden">
                  <img
                    src={baseUrlImage + item?.image_url}
                    className=" h-full w-full lg:aspect-auto cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
      ) : null}
        </div>
    )
}

export default Banner
