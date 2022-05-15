import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: ${props=> props.theme.textColor};
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;

    a { 
        display: flex;
        align-items: center;
        transition: color 0.2s ease-in;
        padding: 20px;
    }

    &:hover {
        a {
            color: ${props => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.div`
    text-align: center;
`
const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 8px;
`

//interface
interface CoinObject {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}


const Coins = () => {
    const [coins, setCoins] = useState<CoinObject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async() => {
            const response = await fetch('https://api.coinpaprika.com/v1/coins');
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>코인스</Title>
            </Header>
            {loading ? <Loader>Lading...</Loader> : ( 
                <CoinList>
                    {coins.map(coin => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`}>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase}`} alt={coin.symbol} />
                                {coin.name} &rarr; 
                            </Link>
                        </Coin>
                    ))}
                </CoinList>
            )}
           
        </Container>
    );
};

export default Coins;