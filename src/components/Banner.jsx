import React from 'react';

const Banner = () => {
  return (
    <section className='relative mb-2 bg-yellow-900 h-96'>
      <div className='w-full h-full bg-cover bg-banner opacity-80' />
      <div className='absolute w-full text-center top-32 text-gray-50 drop-shadow-2xl'>
        <h2 className='text-6xl'>Shop with Us</h2>
        <p className='text-2xl'>Best Products, High Quality</p>
      </div>
    </section>
  );
};

export default Banner;
