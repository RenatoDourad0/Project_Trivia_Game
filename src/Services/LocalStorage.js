const token = 'token';

if (!JSON.parse(localStorage.getItem(token))) {
  localStorage.setItem(token, JSON.stringify([]));
}
const readToken = () => JSON.parse(localStorage.getItem(token));

const saveToken = (items) => localStorage
  .setItem(token, items);

export const getToken = () => {
  const items = readToken();
  return (items);
};

export const addToken = (item) => {
  if (item) {
    // const items = readToken();
    saveToken(item);
  }
};

export const removeToken = (item) => {
  const items = readToken();
  saveToken(items.filter((s) => s.title !== item.title)); // verificar chave api
};
