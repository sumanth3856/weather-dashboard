import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number from 0 to `target` over `duration` ms.
 * Re-triggers whenever `target` changes.
 */
const useCountUp = (target, duration = 600) => {
    const [value, setValue] = useState(target);
    const rafRef = useRef(null);
    const startRef = useRef(null);
    const startValRef = useRef(0);

    useEffect(() => {
        // Cancel any in-progress animation
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const end = target;
        startRef.current = null;
        startValRef.current = value;

        const step = (timestamp) => {
            if (!startRef.current) startRef.current = timestamp;
            const elapsed = timestamp - startRef.current;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startValRef.current + (end - startValRef.current) * eased);

            setValue(current);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step);
            }
        };

        rafRef.current = requestAnimationFrame(step);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, duration]);

    return value;
};

export default useCountUp;
