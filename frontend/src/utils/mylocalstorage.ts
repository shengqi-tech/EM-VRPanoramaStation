/**
 * @hugangyong  处理与localstorage相关的逻辑
 * */

const getToken = () => {
  const key = 'sq-token';
  const local = localStorage.getItem(key);
  let token: string = '';
  if (local && local != '') {
    token = JSON.parse(local);
  }
  return token;
};

const savaToken = (token: string) => {
  const key = 'sq-token';
  localStorage.setItem(key, JSON.stringify(token));
};

const getCurrentUser = () => {
  const key = 'sq-currentUser';
  const local = localStorage.getItem(key);
  let currentUser: any = undefined;
  if (local && local != 'undefined') {
    currentUser = JSON.parse(local);
  }
  return currentUser;
};

const savaCurrentUser = (currentUser: any) => {
  const key = 'sq-currentUser';
  localStorage.setItem(key, JSON.stringify(currentUser));
};

export default function useMyLocalStorage() {
  return {
    getToken,
    savaToken,
    getCurrentUser,
    savaCurrentUser,
  };
}
