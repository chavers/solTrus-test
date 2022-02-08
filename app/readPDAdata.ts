import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { bs58, utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { serialize, deserialize, deserializeUnchecked } from 'borsh';
import { Buffer } from 'buffer';
import {
    Keypair,
    AccountMeta,
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
    
} from '@solana/web3.js';
import BN, { isBN } from "bn.js";
import { web3 } from "@project-serum/anchor";


(async () => {

    // info: https://solanacookbook.com/guides/serialization.html#client-account-data-deserialization

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const nft_mint = new PublicKey("Bj1mAV6AYFn2t62hJQfhdmxT7N8MyNEn1YyoPJcgpGwu");

    const programId = new PublicKey("4cibLYTAbAxpszLU173SAi69x3yo55fy4pn3jxvnTvv4");
    const seed = nft_mint.toString().substring(0, 30);
    const [_fiducie_pda, _fiducie_bump] = await PublicKey.findProgramAddress(
        [Buffer.from('d'.concat(seed))],
        programId
    );
    const fiducie_pda = _fiducie_pda;

    class Assignable {
        constructor(properties) {
            Object.keys(properties).map((key) => {
                return (this[key] = properties[key]);
            });
        }
    }

    class AccoundData extends Assignable { }
    const dataSchema = new Map([
        [
            AccoundData,
            {
                kind: "struct",
                fields: [
                    ["Discriminator",[8]],
                    ["seller_key", [32]],
                    ["seller_ata", [32]],
                    ["nft_price", "u64"],
                    ["nft_mint", [32]],
                    ["vault_account", [32]],
                ]
            }
        ]
    ]);


    let nameAccount = await connection.getAccountInfo(fiducie_pda);
    let accountInfo = deserializeUnchecked(dataSchema, AccoundData, nameAccount.data)


    const _seller_key = accountInfo['seller_key'];
    const _seller_ata = accountInfo['seller_ata'];
    const _nft_price = accountInfo['nft_price'];
    const _nft_mint = accountInfo['nft_mint'];
    const _vault_account = accountInfo['vault_account'];
    console.log('seller_key:', bs58.encode(_seller_key));
    console.log('seller_ata', bs58.encode(_seller_ata));
    console.log('nft_price',parseInt(_nft_price.toString(),10) /  LAMPORTS_PER_SOL );
    console.log('nft_mint', bs58.encode(_nft_mint));
    console.log('vault_account', bs58.encode(_vault_account));
    console.log("====================")

})();
