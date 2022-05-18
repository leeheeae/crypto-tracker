const BASE_URL = `https://api.coinpaprika.com/v1`

export const fetchCoins = () => {
    return fetch(`${BASE_URL}/coins`).then((response => response.json()));
}

export const fetchCoinsInfo = (coinId: string | undefined) => {
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
}

export const fetchCoinsTickers = (coinId: string | undefined) => {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json());
}