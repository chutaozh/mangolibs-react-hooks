import { useState } from 'react';

type SetStorageFunc = (value: any) => void;
type RemoveStorageFunc = () => void;
type UseLocalStorageValueType<T = any> = [T | null, SetStorageFunc, RemoveStorageFunc];

function parseValue(value: string): any {
    try {
        // 尝试将字符串转换为JSON对象
        return JSON.parse(value);
    } catch (error) {
        // 如果转换失败，则直接返回原字符串
        return value;
    }
}

function useLocalStorageValue<T = any>(key: string):UseLocalStorageValueType<T> {
    const [value, setValue] = useState<T | null>(getItem(key));

    function set(value: string): void {
        localStorage.setItem(key, JSON.stringify(value));
        setValue(getItem(key));
    }

    function remove(): void {
        localStorage.removeItem(key);
        setValue(null);
    }

    function getItem(key: string): any {
        const value = localStorage.getItem(key);
        return value !== null ? parseValue(value) : value;
    }

    return [value, set, remove];
};

export default useLocalStorageValue;