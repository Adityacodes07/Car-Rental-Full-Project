import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';

const Testimonial = () => {
     const testimonials = [
        {  name: "Aditya sahu ",
            location: "Damoh naka", 
            image: assets.testimonial_image_1, 
            testimonial: " I've rented luxury cars through this platform and it's been an amazing experience. The selection is impressive and the booking process is seamless." },
       
         {  name: "Ashwani kushwaha",
            location: "vehcile mode , suhagi", 
            image: assets.testimonial_image_2, 
            testimonial: " I've rented luxury cars through this platform and it's been an amazing experience. The selection is impressive and the booking process is seamless." },
        {  name: "Jaya kewat",
            location: "Hirday nagar", 
            image: assets.testimonial_image_1, 
            testimonial: " I've rented luxury cars through this platform and it's been an amazing experience. The selection is impressive and the booking process is seamless." },
       

    ];
  return (
     <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 pt-20 pb-30">
          <Title title="What our customers say" subTitle="Discover why discerning travelers
          choose StayVenrure for thier luxury" />

            <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
                {testimonials.map((testimonial,index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow max-w-xs">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt="star-icon"/>
                               
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.testimonial}"</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Testimonial
