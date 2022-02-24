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
    const cb = new PublicKey("GXZJ4BvQzK7JcsEaWzNSVYeLmpZiNB1Kco59uLsDjq8X"); //cash back publickey
    console.log("programId: ", programId.toBase58());




    const [_cash_back, _cash_back_bump] = await PublicKey.findProgramAddress(
        [cb.toBuffer()], //cashback pubkey as seed
        programId
    );
    const [_vault_authority_pda, _vault_authority_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode("vault_authority"))],
        programId
    );
    const vault_authority_pda = _vault_authority_pda;



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
                    ["cashback_key", [32]],
                    ["cashback_owner", [32]],
                    ["marketplace_id", [32]],
                ]
            }
        ]
    ]);

    const discordID = "889058444877918268"; 
    
    const tx = await program.rpc.newMarketplace(
        _cash_back_bump,
        discordID,
        {
            accounts: {
                cashbackOwner: cha.publicKey,
                cashbackPda: _cash_back,
                vaultAuthority: vault_authority_pda,
                cashbackAccount: cb, //cash back publickey
                systemProgram: anchor.web3.SystemProgram.programId,
            },
            signers: [cha],
        }
    );
    console.log("transaction: ", tx);

    let nameAccount = await connection.getAccountInfo(_cash_back);
    console.log('_cash_back:', _cash_back.toBase58());
    try {
        let accountInfo = deserializeUnchecked(dataSchema, AccoundData, nameAccount.data)
        const cashback_key = accountInfo['cashback_key'];
        console.log('cashback_key:', bs58.encode(cashback_key));
    } catch (error) {
        console.log("cashback_key not init")
    }
    console.log("====================")
    
})();
