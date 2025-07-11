import { DfnsApiClient } from '@dfns/sdk';
import { AsymmetricKeySigner } from '@dfns/sdk-keysigner';
import dotenv from 'dotenv'
import { Logger } from './logger';
import { TransferSearch } from './transfer-search';
import { LoadTests } from './load-tests';

dotenv.config()

const main = async () => {

  const signer = new AsymmetricKeySigner({
      credId: process.env.DFNS_CRED_ID!,
      privateKey: process.env.DFNS_PRIVATE_KEY!,
  });

  const dfnsClient = new DfnsApiClient({
      orgId: process.env.DFNS_ORG_ID!,
      authToken: process.env.DFNS_AUTH_TOKEN!,
      baseUrl: process.env.DFNS_API_URL!,
      signer,
  });
  
  var logger = new Logger("DfnsLoadTest");
  var loadTests = new LoadTests(logger, dfnsClient);
  await loadTests.Run(200);

  var transerSearch = new TransferSearch(logger, dfnsClient);
//  await transerSearch.GetTransactions();

  
}


main();

