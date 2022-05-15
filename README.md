# Cryto Tracker

## 사용 라이브러리

`react`, `react-router-dom`, `react-query`, `styled-components`,`typescript`

### 사용한 Font / color

**font :** `IBM Plex Sans KR`
**color : #FFF, #30336b, #686de0 (lightTheme)**

## 프로젝트 Router

> `Router.tsx` 파일로 구분하여 구현

- '/' => Coins
- '/:coinId' => Coin

---

### < Coin Page >

#### params를 이용하여 설정하기

- useParams를 import
- Router에서 설정했던 coinId params를 구조분해하여 작성 (바로 사용 가능하도록)
- useParams를 쓰는 순간 타입이 <b>string or undefined</b>로 변경됨


### Coins

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