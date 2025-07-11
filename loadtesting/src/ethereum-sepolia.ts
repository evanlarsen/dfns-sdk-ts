import { DfnsApiClient } from '@dfns/sdk';
import { Logger } from './logger';

export class EthereumSepolia {
    private readonly logger: Logger;
    private readonly dfnsClient: DfnsApiClient;

    constructor(logger: Logger, dfnsClient: DfnsApiClient){
        this.logger = logger;
        this.dfnsClient = dfnsClient;
    }

    public async send() {
        var response = await this.dfnsClient.wallets.transferAsset({
            walletId: process.env.DFNS_ETHEREUM_SEPOLIA_WALLET_ID!,
            body: {
                kind: "Erc20",
                contract: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
                to: process.env.FIREBLOCKS_ETHEREUM_SEPOLIA_WALLET_ADDRESS!,
                amount: "1"
            }
        });
        console.log(`${response.status} Ethereum transaction`);
        this.logger.info(JSON.stringify(response));
    }
}