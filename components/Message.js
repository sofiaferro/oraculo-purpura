import React, { useEffect, useRef } from 'react';
import Cafecito from './Cafecito';
import { TweenMax } from 'gsap';

const Message = (data, meaning) => {
  // REFS
  const container = useRef(null);

  // ANIMATIONS
  const animation = new TweenMax.fromTo(
    container.current,
    2,
    { opacity: 0 },
    { opacity: 1 }
  );

  useEffect(() => {
    if (data.isFlipped) {
      animation.play();
    }
    return () => {};
  }, [animation && data]);

  return (
    <div ref={container} className='content'>
      <h5 className='name'>{data.isFlipped && data?.data?.name}</h5>
      <p className='message'>
        {data.isFlipped
          ? meaning === 'rev'
            ? data?.data?.meaning_rev
            : data?.data?.meaning_up
          : ''}
      </p>
      <footer className='footer'>{data?.isFlipped && <Cafecito />}</footer>
    </div>
  );
};

export default Message;
