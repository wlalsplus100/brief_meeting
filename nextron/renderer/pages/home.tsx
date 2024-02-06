import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Header } from '../components/header';
import { Textplace } from '../components/textplace';
import { Main } from '../components/chatBox';
import { messageMapper } from '../utils/function/messagesMapper';
import { getMessages } from '../utils/Mock/getMessage';
import { socket } from '../utils/function/socketConnect';
import { MessageData } from '../utils/types/types';

export default function HomePage() {
  const [opportunity, setOpportunity] = useState<number>(30);
  const [chats, setChats] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const handleMessage = (data: MessageData) => {
      const newChats = messageMapper(
        [{ message: data.message, sender: '무명' }],
        opportunity,
      ).mappedContent;
      setChats(prevChats => [...prevChats, ...newChats]);
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    const { mappedContent, remainingOpportunity } = messageMapper(getMessages(), opportunity);
    setChats(mappedContent);
    setOpportunity(remainingOpportunity);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>짧은 만남</title>
      </Head>
      <Header opportunity={opportunity} />
      <Main>{chats}</Main>
      <Textplace />
    </React.Fragment>
  );
}