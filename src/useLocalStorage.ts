import { useState } from 'react';

type SetStorageFunc = {
    (key: string, value: any): void;
    (obj: Record<string, any>): void;
};
type RemoveStorageFunc = (keys: string | string[]) => void;
type ClearStorageFunc = () => void;

type IUseLocalStorageReturn = [Record<string, any>, SetStorageFunc, RemoveStorageFunc, ClearStorageFunc];

function parseValue(value: string): any {
    try {
        // 尝试将字符串转换为JSON对象
        return JSON.parse(value);
    } catch (error) {
        // 如果转换失败，则直接返回原字符串
        return value;
    }
}

function useLocalStorage(): IUseLocalStorageReturn;
function useLocalStorage(key: string): IUseLocalStorageReturn;
function useLocalStorage(keys: string[]): IUseLocalStorageReturn;
function useLocalStorage(args?: string | string[]) {
    const keys = Array.isArray(args) ? args : (args && [args] || undefined);
    const [values, setValues] = useState(getItems(keys));

    /** 设置 */
    function setItems(key: string, value: any): void;
    function setItems(obj: Record<string, any>): void;
    function setItems(args: string | Record<string, any>): void {
        const func = (key: string, value: any) => {
            localStorage.setItem(key, JSON.stringify(value));
            setValues(getItems(keys));
        };

        if (typeof args === 'string') {
            func(args, arguments[1]);
        } else if (typeof args === 'object') {
            for (const [key, value] of Object.entries(args)) {
                func(key, value);
            }
        }
    }

    /** 获取 */
    function getItems(args?: string[]): Record<string, any> {
        const isArray = Array.isArray(args);
        const _localStorageJosn = JSON.parse(JSON.stringify(localStorage));

        if (isArray) {
            const result: Record<string, any> = {};

            for (const key of args) {
                result[key] = parseValue(_localStorageJosn[key]) || null;
            }

            return result;
        }

        return _localStorageJosn as Record<string, any>;
    }

    /** 移除 */
    function removeItems(key: string): void;
    function removeItems(keys: string[]): void;
    function removeItems(keys?: string | string[]): void {
        if (keys) {
            const thisKeys = Array.isArray(keys) ? keys : [keys];

            thisKeys.forEach(key => {
                localStorage.removeItem(key);
            });

            setValues(getItems(thisKeys));
        }
    }

    function clear() {
        localStorage.clear();
        setValues(getItems(keys));
    }

    return [values, setItems, removeItems, clear];
};

export default useLocalStorage;