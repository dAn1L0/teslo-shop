'use client';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import Image from 'next/image';
import { ProductImage } from '@/components';


interface Props {
  images: string[]
  title: string
  className?: string
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={`${ className }`}>
      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        pagination={true}
        autoplay={{ delay: 3500 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {
          (images.length > 0)
          ? (
            images.map( image => (
              <SwiperSlide key={ image }>
                <ProductImage
                  src={ image }
                  alt={ title }
                  width={ 300 } //600
                  height={ 250 } //500
                  className='w-auto h-auto object-fill'
                />
              </SwiperSlide>
            ))
          )
          : (
            <SwiperSlide>
              <ProductImage
                alt={ 'no-product' }
                width={ 300 } //600
                height={ 250 } //500
                className='w-auto h-auto object-fill'
                priority={true}
              />
            </SwiperSlide>
          )
        }
      </Swiper>
    </div>
  )

}