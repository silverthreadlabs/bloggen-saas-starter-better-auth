'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './carousel.module.css';

const InfiniteCarousel = function InfiniteLooper({
  speed,
  direction,
  children,
}: {
  speed: number;
  direction: 'right' | 'left';
  children: React.ReactNode;
}) {
  const [looperInstances, setLooperInstances] = useState(1);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  function resetAnimation() {
    if (innerRef?.current) {
      innerRef.current.setAttribute('data-animate', 'false');

      setTimeout(() => {
        if (innerRef?.current) {
          innerRef.current.setAttribute('data-animate', 'true');
        }
      }, 10);
    }
  }

  const setupInstances = useCallback(() => {
    if (!innerRef?.current || !outerRef?.current) return;

    const { width } = innerRef.current.getBoundingClientRect();

    const { width: parentWidth } = outerRef.current.getBoundingClientRect();

    const widthDeficit = parentWidth - width;

    const instanceWidth = width / innerRef.current.children.length;

    if (widthDeficit) {
      setLooperInstances(
        looperInstances + Math.ceil(widthDeficit / instanceWidth) + 1
      );
    }

    resetAnimation();
  }, [looperInstances]);


  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);


  useEffect(() => setupInstances(), [setupInstances]);

  useEffect(() => {
    window.addEventListener('resize', setupInstances);

    return () => {
      window.removeEventListener('resize', setupInstances);
    };
  }, [looperInstances, setupInstances]);

  return (
    <div ref={outerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} className="w-[88vw] overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_200px,_black_calc(100%-200px),transparent_100%)] _linear-gradient(to_left,transparent_0,_black_200px,_black_calc(100%-200px),transparent_100%)]">
      <div
        className={`${styles.loop__innerList} ${isHovering ? styles.pauseAnimation : ''}`}
        ref={innerRef}
        data-animate="true"
        style={{ animationPlayState: isHovering ? 'paused' : 'running' }}
      > {[...Array(looperInstances)].map((_, ind) => (
          <div
            key={ind}
            className={`${styles.loop__listInstance}`}
            style={{
              userSelect: 'none',
              animationDuration: `${speed}s`,
              animationDirection: direction === 'right' ? 'reverse' : 'normal',
              animationPlayState: isHovering ? 'paused' : 'running'
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;