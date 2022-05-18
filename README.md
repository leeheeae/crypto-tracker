# Cryto Tracker

### 사용 라이브러리

`react` `react-router-dom` `react-query` `styled-components` `typescript`

### 사용한 Font / color

**font :** `IBM Plex Sans KR`
**color : #FFF, #30336b, #686de0 (lightTheme)**

## 프로젝트 Router

> `Router.tsx` 파일로 구분하여 구현

- '/' => Coins
- '/:coinId' => Coin

---

# Coin

### 해당 params 확인 후 연결하기

- `import { useParams } from "react-router-dom";`
- `const { coinId } = useParams();`
  - Router에서 설정했던 **params** 이름
  - **useParams** 쓰는 순간 타입이 **string or undefined**로 변경됨
  - 해당 params를 이용할 때 타입 에러가 뜨는 경우에는 `coinId: string | undefined` 형태로 설정하면 에러가 사라짐
- 받아온 loaction의 state값 접근하기
  - `useLoaction`을 이용하여 `location.state`로 접근
  - type 설정을 위해 `const state = location.state as RouteState;`_로 설정_
- useMatch를 이용하여 선택한 탭 페이지 표시하기
  - `const priceMatch = useMatch(’path’);` 형태로 해당 페이지가 맞는지 확인하는 코드 작성
    - 해당 페이지일 경우 값이 들어가고 해당페이지가 아닌 경우 null이 뜸
  - _`chartMatch !== null`_ 형태로 해당 페이지가 맞는지 확인한 후 CSS 효과 주기
- loading, info, priceInfo data를 api 통신을 통해 받아와서 적용하기

## Coins

- [https://api.coinpaprika.com/v1/coins](https://api.coinpaprika.com/v1/coins)
- 데이터 형식에 따라 interface 객체 생성
- coins state를 생성하여 설정한 interface 타입 설정
  - `const [coins, setCoins] = useState<CoinObject[]>([]);`
- useEffect로 제일 처음 로딩 됐을 때 데이터 불러오도록 설정
- 받아온 데이터 값은 0에서 100번째까지만 불러오도록 설정
  - `setCoins(json.slice(0, 100));`
- loading state를 생성해서 기본 값은 true로 설정하고 데이터를 받아 왔을 때 false로 설정
- loading 여부에 따라 컴포넌트 설정
- loaction을 이용해 state 받아오기
  - state의 interface 생성
  - 설정한 interface 설정
  ```jsx
  const loaction = useLocation();
  const state = loaction.state as RouteState;
  ```
- infoData와 priceData 받아오기
  - `const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();`
  - `const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();`
  - useState로 info와 price type설정해주기

## React Query

> React 애플리케이션에서 서버 state를 fetching, caching, synchronizing, updating할 수 있도록 도와주는 라이브러리

> **global state**를 건드리지 않고 React 및 React Native 애플리케이션에서 데이터를 가져오고, 캐시하고, 업데이트합니다.

### 설치

`npm i react-query`

### 기본 설정하기

1. `index.tsx` 파일에서 `import { QueryClient, QueryClientProvider } from 'react-query';` Import
2. `const queryClient = new QueryClient();` 생성하기
3. `<App />` 을 감싸는 `QueryClientProvider client={queryClient}` 설정하기

### 사용하기

1. useQuery Hook과 api 호출 함수(따로 파일에 api 호출 함수를 생성하고 받아온 데이터를 return)를 불러온다.
2. `const { isLoading, data } = useQuery(’고유식별자’, API함수);` 형식으로 hook을 사용
3. 받아온 data의 타입을 알려주기 위해 interface를 작성하고 useQuery 뒤에 interface를 설정해준다.

   ```tsx
   const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
   ```

- react-query를 사용하면 데이터를 저장하고 있기 때문에 다시 api 통신을 하는 것이 아니라 로딩이 안뜸

### Devtools 이용하기

- `import { ReactQueryDevtools } from 'react-query/devtools';`
- `*<ReactQueryDevtools initialIsOpen={true}/>*`

### 2개 이상의 useQuery를 사용할 경우

```tsx
const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
  ['info', coinId],
  () => fetchCoinsInfo(coinId),
);
const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
  ['tickers', coinId],
  () => fetchCoinsTickers(coinId),
);

const loading = infoLoading || tickersLoading;
```

- isLoading과 data에 각 이름을 설정
- query의 이름을 배열 형태로 저장하기 때문에 `['info', coinId]` 형태로 설정
- loading은 각 로딩들 중 하나 이상이 로딩일 경우 loading이 뜨도록 설정

## Chart

- 찾고자하는 코인의 종류를 알아야함
  - 이미 Coin 컴포넌트에서 params의 값을 갖고 있기 때문에 해당 params를 props로 넘겨주는 방법을 사용하는 것이 좋음
- useQuery를 이용하여 data 불러오기

  ```tsx
  //Chart.tsx
  const { isLoading, data: endData } = useQuery(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId),
  );

  //api.ts
  export const fetchCoinHistory = (coinId: string | undefined) => {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7 * 2; //2주
    return fetch(
      `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`,
    ).then((response) => response.json());
  };
  ```

- [https://apexcharts.com/](https://apexcharts.com/) 사용할 라이브러리

```tsx
<ApexChart
  type="line"
  **series={[
    {
      name: 'sales',
			//data 불러오는 부분
			//endData가 있으면 map으로 이용하고 없을 경우에 일어나는 에러는 number로 된 배열이라는 것을 알려줘야함
      data: endData?.map((price) => price.close) as number[],
    },
  ]}**
  options={{
    chart: {
      height: 500,
      width: 500,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
  }}
/>
```
