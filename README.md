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
