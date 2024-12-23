import { Tool } from "@goat-sdk/core";
import { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { TOKEN_FACTORY_ABI } from "./abi/factory";

import {
    GetTokenFactoryAddressParams,
    TokenCreationParams,
    GetTokenAddressParams
} from "./parameters";

const TOKEN_FACTORY_ADDRESS = "0xE9B7A8da59c02a6Dcc643AEA3f6fe6E9B57CA127";

export class TokenLauncherService {
    @Tool({
        name: "token_launcher_get_factory_address",
        description: "Get the address of the token factory",
    })
    async getSwapRouterAddress(parameters: GetTokenFactoryAddressParams) {
        return TOKEN_FACTORY_ADDRESS;
    }

    @Tool({
        name: "token_creator_function",
        description: "Creates a token by calling the deployToken function",
    })
    async createToken(
        walletClient: EVMWalletClient,
        parameters: TokenCreationParams,
    ): Promise<string> {
        try {
            const tokenName = parameters.tokenName;
            const tokenSymbol = parameters.tokenSymbol;

            const hash = await walletClient.sendTransaction({
                to: TOKEN_FACTORY_ADDRESS,
                abi: TOKEN_FACTORY_ABI,
                functionName: "deployToken",
                args: [tokenName, tokenSymbol],
            });
            
            // const tokenAddress = await walletClient.read({
            //     address: TOKEN_FACTORY_ADDRESS,
            //     abi: TOKEN_FACTORY_ABI,
            //     functionName: "latestTokenAddress",
            // }) as { value: string };

            // return tokenAddress.value;
            return hash.hash;
        } catch (error) {
            throw Error(`Failed to create token: ${error}`);
        }
    }

    @Tool({
        name: "token_address_getter_function",
        description: "Returns the address of a deployed token",
    })
    async getTokenAddress(
        walletClient: EVMWalletClient,
        parameters: GetTokenAddressParams,
    ): Promise<string> {
        try {
            const tokenAddress = await walletClient.read({
                address: TOKEN_FACTORY_ADDRESS,
                abi: TOKEN_FACTORY_ABI,
                functionName: "latestTokenAddress",
            }) as { value: string };

            return tokenAddress.value;
        } catch (error) {
            throw Error(`Failed to create token: ${error}`);
        }
    }

}
