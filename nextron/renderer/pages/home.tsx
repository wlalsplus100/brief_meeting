import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Header } from '../components/header';
import { Textplace } from '../components/textplace';
import { Main } from '../components/chatBox';
import { messageMapper } from '../utils/function/messagesMapper';
import { getMessages } from '../utils/Mock/getMessage';
import { connectSocket } from '../utils/function/socketConnect';
import { MessageData } from '../utils/types/types';
import { Socket } from 'socket.io-client';

export default function HomePage() {
  const [opportunity, setOpportunity] = useState<number>(30);
  const [chats, setChats] = useState<React.ReactNode[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = connectSocket();
    setSocket(newSocket);
    newSocket.emit('joinRoom', 'room1');
    newSocket.on('roomUsers', (users: string[]) => {
      console.log(users);
    });

    return () => {
      newSocket.disconnect(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
    };
  }, []);

  useEffect(() => {
    const handleMessage = (data: MessageData) => {
      const newChats = messageMapper(
        [{ message: data.message, sender: '무명' }],
        opportunity,
      ).mappedContent;
      setChats(prevChats => [...prevChats, ...newChats]);
    };

    if (socket) {
      socket.on('message', handleMessage);
      return () => {
        socket.off('message', handleMessage);
      };
    }
  }, [socket, opportunity]);

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
      <Textplace setChats={setChats} opportunity={opportunity} setOpportunity={setOpportunity} />
    </React.Fragment>
  );
}
