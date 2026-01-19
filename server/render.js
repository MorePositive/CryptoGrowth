import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ServerApp from '../client/src/ServerApp';

module.exports = (req, res, indexFile) => {
    return res.send(
      indexFile.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(<ServerApp url={req.url} />)}</div>`
    ));
};
