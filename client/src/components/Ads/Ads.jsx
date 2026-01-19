import { Card } from 'react-bootstrap';

export const Ads = () => {
  /*const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/search/trending')
      .then((res) => res.json())
      .then((data) => setData(data.coins));
  }, []);*/

  return (
    <Card className="block-ads">
        <Card.Body>
            Ads block
        </Card.Body>
    </Card>
  )
};
