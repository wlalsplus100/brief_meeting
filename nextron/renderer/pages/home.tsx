import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Header } from '../components/header';
import { Textplace } from '../components/textplace';
import { Main } from '../components/chatBox';
import { messageMapper } from '../utils/function/messagesMapper';
import { connectSocket } from '../utils/function/socketConnect';
import { MessageData } from '../utils/types/types';
import { Socket } from 'socket.io-client';

interface TroomUsers {
  roomMember: string[];
  roomName: string;
}

export default function HomePage() {
  const [opportunity, setOpportunity] = useState<number>(30);
  const [chats, setChats] = useState<React.ReactNode[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const opponentNameRef = useRef<string>('');
  const [myName, setMyName] = useState<string>('');
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [roomName, setRoomName] = useState<string>('');

  useEffect(() => {
    const newSocket = connectSocket();
    setSocket(newSocket);
    newSocket.emit('joinRoom', 'room1');
    newSocket.on('roomUsers', ({ roomMember: users, roomName }: TroomUsers) => {
      setRoomName(roomName);
      console.log(users);
      console.log(roomName);
      if (users.length == 2) {
        opponentNameRef.current = users[0];
        setMyName(users[1]);
      } else {
        setMyName(users[0]);
      }
    });
    newSocket.on('joinAnother', userName => {
      console.log(`${userName}이 들어왔습니다`);
      opponentNameRef.current = userName;
    });

    return () => {
      newSocket.disconnect(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
    };
  }, []);

  useEffect(() => {
    const handleMessage = (data: MessageData) => {
      const newChats = messageMapper(
        [{ message: data.message, sender: opponentNameRef.current }],
        opportunity,
        lastMessageRef,
        myName,
      ).mappedContent;
      setChats(prevChats => [...prevChats, ...newChats]);
      setOpportunity(opportunity - 1);
    };

    if (socket) {
      socket.on('message', handleMessage);
      return () => {
        socket.off('message', handleMessage);
      };
    }
  }, [socket, opportunity, opponentNameRef]);

  return (
    <React.Fragment>
      <Head>
        <title>짧은 만남</title>
      </Head>
      <Header opportunity={opportunity} />
      <Main>{chats}</Main>
      <Textplace
        setChats={setChats}
        opportunity={opportunity}
        setOpportunity={setOpportunity}
        lastMessageRef={lastMessageRef}
        myName={myName}
        roomName={roomName}
      />
    </React.Fragment>
  );
}
