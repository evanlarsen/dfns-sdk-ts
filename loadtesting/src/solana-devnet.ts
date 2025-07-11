import { DfnsApiClient } from '@dfns/sdk';
import { Logger } from './logger';

export class SolanaDevnet {
    private readonly logger: Logger;
    private readonly dfnsClient: DfnsApiClient;

    constructor(logger: Logger, dfnsClient: DfnsApiClient){
        this.logger = logger;
        this.dfnsClient = dfnsClient;
    }

    public async send() {
        // var response = await dfnsClient.feeSponsors.createFeeSponsor({ body: { walletId: process.env.DFNS_SOLANA_FEE_SPONSOR_WALLET_ID! }});
        // console.log(response);

        var response = await this.dfnsClient.wallets.transferAsset({
            walletId: process.env.DFNS_SOLANA_WALLET_ID!,
            body: {
                kind: "Spl",
                to: process.env.FIREBLOCKS_SOLANA_WALLET_ADDRESS!,
                mint: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
                amount: "1"
            }
        });
        console.log(`${response.status} Solana transaction`);
        this.logger.info(JSON.stringify(response));
    }
}