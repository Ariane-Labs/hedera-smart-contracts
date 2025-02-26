import {AccountId, Client, PrivateKey} from "@hashgraph/sdk";
import {env} from '@/utils/environment-variables';

export const client = Client
  .forNetwork({ [env.networkUrl] : new AccountId(parseInt(env.networkAccount)) })
  .setMirrorNetwork(env.mirrorNodeUrl);

client.setOperator(
  AccountId.fromString(env.operatorAccount),
  PrivateKey.fromString(env.operatorAccountKey)
);
