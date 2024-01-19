import React from 'react';
import Head from 'next/head';
import { Header } from '../components/header';
import { Textplace } from '../components/textplace';
import { Main } from '../components/chatBox';
import { Chat } from '../components/chat';

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>짧은 만남</title>
      </Head>
      <Header opportunity={30} />
      <Main>
        <Chat message="안녕" sender="무명"></Chat>
        <Chat message="졸리네" sender="무명"></Chat>
        <Chat message="너는?" sender="무명"></Chat>
        <Chat message="난 커피 마셨어" sender></Chat>
        <Chat message="헐 그럼 안졸리겠네?" sender="무명"></Chat>
        <Chat message="아니 커피 안드는 체질이라" sender></Chat>
        <Chat message="존나 안졸린데요" sender></Chat>
        <Chat message="엣, 유감" sender="무명"></Chat>
        <Chat message="그럼 나랑 밤새워 놀아줄거지?" sender="무명"></Chat>
        <Chat message="지금 바로 재매칭 누를게~" sender></Chat>
      </Main>
      <Textplace />
    </React.Fragment>
  );
}
