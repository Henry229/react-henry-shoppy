import React from 'react';

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className='flex items-center gap-2 shrink-0'>
      <img className='rounded-full w-9 h-9' src={photoURL} alt='profile' />
      <span className='hidden md:block'>{displayName}</span>
    </div>
  );
}
