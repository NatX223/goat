import { type Chain, PluginBase } from "@goat-sdk/core";
import type { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { mode, modeTestnet } from "viem/chains";
import { TokenLauncherService } from "./token-launcher.service";

const SUPPORTED_CHAINS = [mode, modeTestnet];

export class TokenLauncher extends PluginBase<EVMWalletClient> {
    constructor() {
        super("token-launcher", [new TokenLauncherService()]);
    }

    supportsChain = (chain: Chain) => chain.type === "evm" && SUPPORTED_CHAINS.some((c) => c.id === chain.id);
}

export const tokenLauncher = () => new TokenLauncher();
