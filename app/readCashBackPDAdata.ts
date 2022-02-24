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

    const cb = new PublicKey("GXZJ4BvQzK7JcsEaWzNSVYeLmpZiNB1Kco59uLsDjq8X");

    const programId = new PublicKey("4cibLYTAbAxpszLU173SAi69x3yo55fy4pn3jxvnTvv4");
    
    const [_cash_back_pda, _cash_back_bump] = await PublicKey.findProgramAddress(
        [cb.toBuffer() ],
        programId
    );
    const cash_back_pda = _cash_back_pda;

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
                    ["cashback_key", [32]],
                    ["cashback_owner", [32]],
                    ["marketplace_id", [32]],
                ]
            }
        ]
    ]);


    let nameAccount = await connection.getAccountInfo(cash_back_pda);
    let accountInfo = deserializeUnchecked(dataSchema, AccoundData, nameAccount.data)


    const Discriminator = accountInfo['Discriminator'];
    const cashback_key = accountInfo['cashback_key'];
    const cashback_owner = accountInfo['cashback_owner'];
    const marketplace_id = accountInfo['marketplace_id'];
    console.log('Discriminator:', bs58.encode(Discriminator));
    console.log('cashback_key:', bs58.encode(cashback_key));
    console.log('cashback_owner', bs58.encode(cashback_owner));
    console.log('marketplace_id', String.fromCharCode(...marketplace_id));
    console.log("====================")

})();
