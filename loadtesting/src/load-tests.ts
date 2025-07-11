import { SolanaDevnet } from './solana-devnet'
import { EthereumSepolia } from './ethereum-sepolia';
import { AvalancheFuji } from './avalanche-fuji';
import { Logger } from './logger';
import { DfnsApiClient } from '@dfns/sdk';

const RATE_LIMIT = 100;
const RATE_WINDOW_MS = 60_000;

export class LoadTests {
    private readonly logger: Logger;
    private readonly dfnsClient: DfnsApiClient;

    constructor(logger: Logger, dfnsClient: DfnsApiClient){
        this.logger = logger;
        this.dfnsClient = dfnsClient;
    }

    public async Run(transfersPerBlockchain: number){
        var solanaTest = new SolanaDevnet(this.logger, this.dfnsClient);
        var ethereumSepolia = new EthereumSepolia(this.logger, this.dfnsClient);
        var avalancheFuji = new AvalancheFuji(this.logger, this.dfnsClient);

        const allTasks: (() => Promise<void>)[] = [];

        for (let i = 0; i < transfersPerBlockchain; i++) {
            allTasks.push(() => this.safeSend(solanaTest, 'SolanaDevnet'));
            allTasks.push(() => this.safeSend(ethereumSepolia, 'EthereumSepolia'));
            //allTasks.push(() => this.safeSend(avalancheFuji, 'AvalancheFuji'));
        }

        // Chunk and throttle
        for (let i = 0; i < allTasks.length; i += RATE_LIMIT) {
            const chunk = allTasks.slice(i, i + RATE_LIMIT);
            await Promise.all(chunk.map(fn => fn()));
            if (i + RATE_LIMIT < allTasks.length) {
                console.log(`Processed ${i + RATE_LIMIT} transfers. Waiting for ${RATE_WINDOW_MS / 1000} seconds...`);
                await this.sleep(RATE_WINDOW_MS);
            }
        }
    }

    private async safeSend(blockchain: { send: () => Promise<void> }, label: string): Promise<void> {
        try {
            await blockchain.send();
        } catch (err) {
            this.logger.error(`Error sending transfer on ${label}: ${err instanceof Error ? err.message : String(err)}`);
            console.log(err);
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}