Englist | <a href="https://github.com/chutaozh/mangolibs-react-hooks/blob/master/README-zh_CN.md" target="_blank">中文</a>

<p>
<img alt="npm" src="https://img.shields.io/npm/v/@mangolibs/react-hooks?logo=npm&color=%234ac41c">
<img alt="npm" src="https://img.shields.io/npm/dm/@mangolibs/react-hooks?logo=npm&color=%234ac41c">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/chutaozh/mangolibs-react-hooks">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/chutaozh/mangolibs-react-hooks">
</p>

### Installation

```js
npm install @mangolibs/react-hooks
```

### Usage

```js
import { useXXX } from "@mangolibs/react-hooks";
```

### API

##### 1. useDebounce

`useDebounce(func: Function, delay: number = 500): { run: Function, cancel: Function }`

eg.

```js
import { useDebounce } from "@mangolibs/react-hooks";

function App() {
  const { run: handleChange } = useDebounce(() => {
    console.log("useDebounce test.");
  }, 500);

  return <input onChange={handleChange} />;
}
```

##### 2. useThrottle

`useThrottle(func: Function, delay: number = 500): { run: Function, cancel: Function }`

eg.

```js
import { useThrottle } from "@mangolibs/react-hooks";

function App() {
  const { run: handleClick } = useThrottle(() => {
    console.log("useThrottle test.");
  }, 500);

  return <button onClick={handleClick}>continuous click</button>;
}
```

##### 3. useCountdown

```js
useCountdown({
  duration: number; // ms
  interval?: number; // ms (default: 1000)
  onFinish?: () => void;
}): {
  remaining: number; // ms
  start: () => void;
  pause: () => void;
  reset: () => void;
  stop: () => void;
}; // return
```

eg.

```js
import { useCountDown } from "@mangolibs/react-hooks";

function App() {
  const { start, pause, reset, stop, remaining } = useCountDown({
    duration: 10 * 1000,
    onFinish: () => {
      console.log("finish");
    },
  });

  return (
    <div>
      <button onClick={start}>start</button>
      <button onClick={pause}>pause</button>
      <button onClick={reset}>reset</button>
      <button onClick={stop}>stop</button>
      <div>{`${Math.ceil(remaining / 1000)} sec`}</div>
    </div>
  );
}
```

##### 4. useCookie

```js
useCookie(): [object, SetCookieFunc, RemoveCookieFunc, ClearCookieFunc];
useCookie(name: string): [object, SetCookieFunc, RemoveCookieFunc, ClearCookieFunc];
useCookie(names: string[]): [object, SetCookieFunc, RemoveCookieFunc, ClearCookieFunc];
```

eg.

```js
import { useCookie } from "@mangolibs/react-hooks";

function App() {
  const [cookie, setCookie, removeCookie, clearCookie] = useCookie();
  return (
    <div>
      <button onClick={() => setCookie("foo", "bar")}>set</button>
      <button onClick={() => removeCookie("foo")}>remove</button>
      <button onClick={() => clearCookie()}>clear</button>
      <div>{cookie.name}</div>
    </div>
  );
}
```

##### 5. useCookieValue

`useCookieValue(name: string): [string, SetCookieFunc, RemoveCookieFunc];`

eg.

```js
import { useCookieValue } from "@mangolibs/react-hooks";

function App() {
  const [value, setCookie, removeCookie] = useCookieValue("foo");
  return (
    <div>
      <button onClick={() => setCookie("bar")}>set</button>
      <button onClick={() => removeCookie()}>remove</button>
      <div>{value}</div>
    </div>
  );
}
```

##### 6. useLocalStorage

```js
// Same as useCookie.
```

##### 7. useLocalStorageValue

```js
// Same as useCookieValue.
```

##### 8. useSessionStorage

```js
// Same as useCookie.
```

##### 9. useSessionStorageValue

```js
// Same as useCookieValue.
```
