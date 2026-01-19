import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Col } from 'react-bootstrap';
import { isClient } from '../../helpers';

const Ads = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData('Ads displayed here');
    }, 2000);
  }, []);

  return (
    <>
      {isClient() && data &&
        <Col>
          <Card className="block">
              <Card.Body className="block-ads">{data}</Card.Body>
          </Card>
        </Col>
      }
    </>
  );
};

export default Ads;
