import dotenv from 'dotenv';

dotenv.config();

export const env = {
  networkUrl: process.env.NETWORK_URL || '127.0.0.1:50211',
  networkAccount: process.env.NETWORK_ACCOUNT || '3',
  operatorAccount: process.env.OPERATOR_ACCOUNT || '2',
  operatorAccountKey: process.env.OPERATOR_ACCOUNT_KEY || '302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137',
  mirrorNodeUrl: process.env.MIRROR_NODE_URL || 'http://127.0.0.1:5600',
};
