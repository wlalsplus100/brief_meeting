import { Socket } from 'socket.io';

export class UserNames {
  #randomNames = ['심심한 거북이', '무심한 호랑이', '눈물짓는 원숭이', '졸린 두루미'];
  #usedNames: Record<string, string> = {};

  setUsedNames = (id: string, name: string) => {
    this.#usedNames = { ...this.#usedNames, [id]: name };
  };

  getRandomName = ({ id }: Socket) => {
    const availableNames = this.#randomNames.filter(
      name => !Object.values(this.#usedNames).includes(name),
    );
    if (availableNames.length === 0) {
      throw new Error('모든 이름이 사용중');
    }
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const randomName = availableNames[randomIndex];
    this.setUsedNames(id, randomName);
    return randomName;
  };

  delUsedNames = ({ id }: Socket) => {
    delete this.#usedNames[id];
  };
}
