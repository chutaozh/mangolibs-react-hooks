import { useState } from 'react';

type SetStorageFunc = (value: any) => void;
type RemoveStorageFunc = () => void;
type UseSessionStorageValueType<T = any> = [T | null, SetStorageFunc, RemoveStorageFunc];

function parseValue(value: string): any {
    try {
        // 尝试将字符串转换为JSON对象
        return JSON.parse(value);
    } catch (error) {
        // 如果转换失败，则直接返回原字符串
        return value;
    }
}

function useSessionStorageValue<T = any>(key: string): UseSessionStorageValueType {
    const [value, setValue] = useState<T | null>(getItem(key));

    function set(value: string): void {
        sessionStorage.setItem(key, JSON.stringify(value));
        setValue(getItem(key));
    }

    function remove(): void {
        sessionStorage.removeItem(key);
        setValue(null);
    }

    function getItem(key: string): any {
        const value = sessionStorage.getItem(key);
        return value !== null ? parseValue(value) : value;
    }

    return [value, set, remove];
};

export default useSessionStorageValue;