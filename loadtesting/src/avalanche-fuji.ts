import { DfnsApiClient } from '@dfns/sdk';
import { Logger } from './logger';

export class AvalancheFuji {
     private readonly logger: Logger;
    private readonly dfnsClient: DfnsApiClient;

    constructor(logger: Logger, dfnsClient: DfnsApiClient){
        this.logger = logger;
        this.dfnsClient = dfnsClient;
    }
    
    public async send() {
        var response = await this.dfnsClient.wallets.transferAsset({
            walletId: process.env.DFNS_AVALANCHE_FUJI_WALLET_ID!,
            body: {
                kind: "Erc20",
                contract: "0x5425890298aed601595a70AB815c96711a31Bc65",
                to: process.env.FIREBLOCKS_AVALANCHE_FUJI_WALLET_ADDRESS!,
                amount: "1"
            }
        });
        console.log(`${response.status} Avalanche transaction`);
        this.logger.info(JSON.stringify(response));
    }
}