import React from 'react';
import { useState, useEffect } from 'react';

const Headlines = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://newsapi.org/v2/everything?language=en&q=crypto&apiKey=014d9c6bc04e47e5a34fe95e1e3b1b0b')
      .then((res) => res.json())
      .then((data) => {
        setData(data.articles.slice(0, 20));
      });
  }, []);

  return (
    <div className="block">
      {data ? (
        <table width="100%"><tbody>
          {data.map((article, i) => {
              return <tr key={i}>
                <td>
                  <div>
                    <img height="70px" src={article.urlToImage} alt={article.title} />
                    <div>{article.publishedAt}</div>
                  </div>
                </td>
                <td>
                  <div>
                    <div>{article.title}</div>
                    <div>{article.description}</div>
                  </div>
                </td>
              </tr>;
          })}
        </tbody></table>
      ) : 'no data available'}
    </div>
  )
};

export default Headlines;
