import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Col } from 'react-bootstrap';

const Ads = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setData('Ads displayed here');
    }, 2000);
  }, []);

  return (data ?
    <Col xs="4">
      <Card className="block-ads">
          <Card.Body>{data}</Card.Body>
      </Card>
    </Col>
  : '');
};

export default Ads;
