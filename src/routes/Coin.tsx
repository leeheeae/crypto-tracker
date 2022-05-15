import { useParams } from "react-router-dom";

const Coin = () => {
    const { coinId } = useParams();

    console.log(coinId)

    return (
        <div>
            코인
        </div>
    );
};

export default Coin;