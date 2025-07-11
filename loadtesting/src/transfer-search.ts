import { DfnsApiClient } from '@dfns/sdk';
import { Logger } from './logger';

export class TransferSearch {
    private readonly logger: Logger;
    private readonly dfnsClient: DfnsApiClient;

    constructor(logger: Logger, dfnsClient: DfnsApiClient){
        this.logger = logger;
        this.dfnsClient = dfnsClient;
    }

    public async GetTransactions(){
        var response = await this.dfnsClient.wallets.listTransfers({ walletId: process.env.DFNS_SOLANA_WALLET_ID! })
        this.logger.info(JSON.stringify(response));
    }
}