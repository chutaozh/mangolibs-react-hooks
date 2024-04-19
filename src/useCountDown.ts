import { useState, useEffect, useRef } from 'react';

interface IUseCountdownProps {
    /** 倒计时时长（毫秒） */
    duration: number;
    /** 倒计时频率（毫秒，默认: 1000） */
    interval?: number;
    /** 倒计时结束时执行的函数 */
    onFinish?: () => void;
}

const useCountDown = ({ duration, interval, onFinish }: IUseCountdownProps) => {
    const initialTimeRemaining = Math.max(duration, 0);
    const [remaining, setRemaining] = useState(initialTimeRemaining);
    const [running, setRunning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const start = () => {
        setRunning(true);
    };

    const pause = () => {
        setRunning(false);
    };

    const reset = () => {
        pause();
        setRemaining(initialTimeRemaining);
    };

    const stop = () => {
        pause();
        onFinish?.();
    };

    useEffect(() => {
        const effectiveInterval = Math.min((interval || 1000), remaining);

        if (running && remaining > 0) {
            timerRef.current = setTimeout(() => {
                setRemaining(prevTime => Math.max(prevTime - effectiveInterval, 0));
            }, effectiveInterval);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [running, remaining]);

    useEffect(() => {
        if (remaining <= 0) {
            stop();
        }
    }, [remaining]);

    return { remaining, start, pause, reset, stop };
};

export default useCountDown;
