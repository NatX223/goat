import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";

export class GetTokenFactoryAddressParams extends createToolParameters(z.object({})) {}

export class GetTokenAddressParams extends createToolParameters(z.object({})) {}

export class TokenCreationParams extends createToolParameters(
    z.object({
        tokenName: z.string().describe("The name of the token to be created"),
        tokenSymbol: z.string().describe("The symbol of the token to be created"),
    }),
) {}
