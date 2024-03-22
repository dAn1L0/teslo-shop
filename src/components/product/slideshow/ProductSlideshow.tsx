'use client';
import { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import Image from 'next/image';
import { ProductImage } from '@/components';


interface Props {
  images: string[]
  title: string
  className?: string
}

export const ProductSlideshow = ({ images, title, className }: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={`${ className }`}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties }
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 3500 }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          (images.length > 0 )
          ? (
            images.map( image => (
              <SwiperSlide key={ image }>
                <ProductImage
                  src={ image }
                  alt={ title }
                  width={ 1024 } // 512
                  height={ 800 } // 400
                  className='w-auto h-auto rounded-lg object-fill'
                />
              </SwiperSlide>
            ))
          )
          : (
            <SwiperSlide>
              <ProductImage
                alt={ 'no-image' }
                width={ 1024 } // 512
                height={ 800 } // 400
                className='w-auto h-auto rounded-lg object-fill'
              />
            </SwiperSlide>
          )
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          (images.length > 0)
          ? (
            images.map( image => (
              <SwiperSlide key={ image }>
                <ProductImage
                  src={ image }
                  alt={ title }
                  width={ 300 } //150
                  height={ 300 } // 150
                  className='w-auto h-auto rounded-lg object-fill'
                />
              </SwiperSlide>
            ))
          )
          : (
            <SwiperSlide>
              <ProductImage
                alt={ 'no-image' }
                width={ 300 } //150
                height={ 300 } // 150
                className='w-auto h-auto rounded-lg object-fill'
              />
            </SwiperSlide>
          )
        }
      </Swiper>
    </div>
  )

}