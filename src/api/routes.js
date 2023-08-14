const HOST = "http://localhost:3000";

const register = `${HOST}/api/auth/register`;

const login = `${HOST}/api/auth/login`;

const avatars = `${HOST}/api/avatars`;

const setAvatar = `${HOST}/api/auth/setAvatar`;

const contacts = `${HOST}/api/auth/contacts`;

const postMessage = `${HOST}/api/messages`;

const getMessages = `${HOST}/api/messages`;

export default { HOST, register, login, avatars, setAvatar, contacts, postMessage, getMessages }