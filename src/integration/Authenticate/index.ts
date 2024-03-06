import path from 'path';

const nodeEnv = process.env.NODE_ENV === 'dev';

const ClientId = nodeEnv
  ? process.env.CLIENT_ID_SANDBOX
  : process.env.CLIENT_ID;
const ClientSecret = nodeEnv
  ? process.env.CLIENT_SECRET_SANDBOX
  : process.env.CLIENT_SECRET;
const Cetficated = nodeEnv
  ? process.env.CERT_USER_SANDBOX
  : process.env.CERT_USER;

export default {
  sandbox: nodeEnv,
  client_id: ClientId,
  client_secret: ClientSecret,
  certificate: path.resolve(__dirname, `./${Cetficated}`),
};
