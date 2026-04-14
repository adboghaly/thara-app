import React, { useEffect, useState } from 'react';
import { useSpring } from 'framer-motion';

export default function AnimatedNumber({ value }) {
  const springValue = useSpring(0, { stiffness: 100, damping: 30, duration: 1200 });

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    return springValue.onChange((latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  return <span>{displayValue.toLocaleString('en-US')}</span>;
}
