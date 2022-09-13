const token = 'token';

const readToken = () => localStorage.getItem(token);

const saveToken = (items) => localStorage
  .setItem(token, items);

export const getToken = () => {
  const items = readToken();
  return (items);
};

export const addToken = (item) => {
  saveToken(item);
};

export const removeToken = () => {
  const items = readToken();
  localStorage.removeItem(items); // verificar chave api
};

const keyName = 'triviaRank';

export const addRankItem = (item) => {
  let playerList = [];
  const storage = localStorage.getItem(keyName);
  if (storage === null) {
    playerList.push(item);
    localStorage.setItem(keyName, JSON.stringify(playerList));
  } else {
    playerList = JSON.parse(localStorage.getItem(keyName));
    playerList.push(item);
    localStorage.setItem(keyName, JSON.stringify(playerList));
  }
};

const MINUS_ONE = -1;

export const getRankItems = () => JSON.parse(localStorage.getItem(keyName))
  .sort((a, b) => ((a.score < b.score) ? 1 : MINUS_ONE));
