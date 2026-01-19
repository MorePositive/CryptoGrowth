import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './headlines.scss';

const Headlines = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://newsapi.org/v2/everything?language=en&q=crypto&pageSize=10&apiKey=014d9c6bc04e47e5a34fe95e1e3b1b0b')
      .then((res) => res.json())
      .then((data) => {
        setData(data.articles.slice(0, 10));
      });
  }, []);

  const dateFormat = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  });

  return (
    <Card className="block">
      <Card.Title>Latest Headlines</Card.Title>
      <Card.Body className="block-headlines">
        {data ? data.map((article, i) => {
          return <div key={i} className="item" style={{ backgroundImage:`url(${article.urlToImage})` }}>
            <a href={article.url} target="_blank" rel="noreferrer" className="title">{article.title}</a>
            <div className="date">{dateFormat.format(new Date(article.publishedAt))}</div>
            <div className="description">{article.description}</div>
          </div>;
        }) : 'no data available'}
      </Card.Body>
    </Card>
  )
};

export default Headlines;
