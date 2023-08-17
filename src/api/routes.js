const HOST = "https://snappy-chat-service.onrender.com";

const register = `${HOST}/api/auth/register`;

const login = `${HOST}/api/auth/login`;

const avatars = `${HOST}/api/avatars`;

const premiumAvatars = `${HOST}/api/avatars/premium`;

const purchasedAvatars = `${HOST}/api/avatars/purchasedAvatars`;

const setAvatar = `${HOST}/api/auth/setAvatar`;

const contacts = `${HOST}/api/auth/contacts`;

const postMessage = `${HOST}/api/messages`;

const getMessages = `${HOST}/api/messages`;

const purchase = `${HOST}/api/avatars/purchase`;

const logo = `${HOST}/logo`;

export default {
  HOST,
  register,
  login,
  avatars,
  premiumAvatars,
  purchasedAvatars,
  setAvatar,
  contacts,
  postMessage,
  getMessages,
  purchase,
  logo,
};
