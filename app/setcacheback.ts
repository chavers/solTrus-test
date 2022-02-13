import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { AccountLayout, ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
    Commitment,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";
import { bs58, utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import secret from './secret';
import { FirstTry } from './first_try';
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';
import { serialize, deserialize, deserializeUnchecked } from 'borsh';

(async () => {

    const connection = new Connection("https://api.devnet.solana.com", "processed");
    const options = anchor.Provider.defaultOptions();
    const cha = Keypair.fromSecretKey(bs58.decode(secret.CHAT_SECRET_KEY));
    const wallet = new NodeWallet(cha);
    const provider = new anchor.Provider(connection, wallet, options);
    anchor.setProvider(provider);
    const idl = JSON.parse(
        require("fs").readFileSync("./first_try.json", "utf8")
    );
    const programId = new PublicKey(secret.PROGRAM_ID);
    const program = new anchor.Program(idl, programId);

    console.log("programId: ", programId.toBase58());




    const [_cache_back, _cache_back_bump] = await PublicKey.findProgramAddress(
        [Buffer.from('cacheback')],
        programId
    );

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
                    ["Discriminator", [8]],
                    ["cache_back", [32]],
                ]
            }
        ]
    ]);


    let nameAccount = await connection.getAccountInfo(_cache_back);

    try {
        let accountInfo = deserializeUnchecked(dataSchema, AccoundData, nameAccount.data)
        const cache_back = accountInfo['cache_back'];
        console.log('cache_back:', bs58.encode(cache_back));
    } catch (error) {
        console.log("cache_back not init")
    }
    console.log("====================")


    const tx = await program.rpc.setfee(
        _cache_back_bump,
        {
            accounts: {
                oneAdmin: cha.publicKey,
                cachebackPda: _cache_back,
                cachebackAccount: new PublicKey("GXZJ4BvQzK7JcsEaWzNSVYeLmpZiNB1Kco59uLsDjq8X"), //cache back publickey
                systemProgram: anchor.web3.SystemProgram.programId,
            },
            signers: [cha],
        }
    );
    console.log("transaction: ", tx);

    nameAccount = await connection.getAccountInfo(_cache_back);

    try {
        let accountInfo = deserializeUnchecked(dataSchema, AccoundData, nameAccount.data)
        const cache_back = accountInfo['cache_back'];
        console.log('cache_back:', bs58.encode(cache_back));
    } catch (error) {
        console.log("cache_back not init")
    }
    console.log("====================")

})();
