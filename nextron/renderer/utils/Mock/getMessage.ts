import { Message } from '../types/types';

export const getMessages = () => {
  const messages = [
    { message: '안녕', sender: '무명' },
    { message: '졸리네', sender: '무명' },
    { message: '너는?', sender: '무명' },
    { message: '난 커피 마셨어', sender: true },
    { message: '헐 그럼 안졸리겠네?', sender: '무명' },
    { message: '아니 커피 안드는 체질이라', sender: true },
    { message: '존나 안졸린데요', sender: true },
    { message: '엣, 유감', sender: '무명' },
    { message: '그럼 나랑 밤새워 놀아줄거지?', sender: '무명' },
    { message: '지금 바로 재매칭 누를게~', sender: true },
  ];
  return messages as Message[];
};
