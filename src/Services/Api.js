export const fetchToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await response.json();
  return result;
};

export const fetchQuestions = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await response.json();
  return result;
};
