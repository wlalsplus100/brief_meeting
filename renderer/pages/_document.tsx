import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { css, Global } from '@emotion/react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <Global
          styles={css`
            html,
            body {
              margin: 0;
              padding: 0;
              height: 100%;
              min-width: 100%;
            }

            body {
              background: #191919;
              font-family: Helvetica, Arial, sans-serif;
              font-size: 16px;
            }
            #__next {
              height: 100%;
              display: flex;
              flex-direction: column;
            }
          `}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
