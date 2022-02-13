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




    const [_cash_back, _cash_back_bump] = await PublicKey.findProgramAddress(
        [Buffer.from('cashback')],
        programId
    );
    const [_vault_authority_pda, _vault_authority_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode("vault_authority"))],
        programId
    );


    const tx = await program.rpc.sharefee(
        {
            accounts: {
                oneAdmin: cha.publicKey,
                devFront: new PublicKey("7eSvqcNvVkTJCJZn4Tf27D7NKj5a2En6tGY4HkiRHbxT"),
                devBack:  new PublicKey(secret.CHAT_PUBLIC_KEY),
                cashbackPda: _cash_back,
                cashbackAccount: new PublicKey("GXZJ4BvQzK7JcsEaWzNSVYeLmpZiNB1Kco59uLsDjq8X"), //cash back publickey
                vaultAuthority: _vault_authority_pda,
                systemProgram: anchor.web3.SystemProgram.programId,
            },
            signers: [cha],
        }
    );
    console.log("transaction: ", tx);


})();
