import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import  NodeWallet  from '@project-serum/anchor/dist/cjs/nodewallet';
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

const alice = async () => {
    const connection = new Connection("https://api.devnet.solana.com", "processed");
    const options = anchor.Provider.defaultOptions();
    const wallet = NodeWallet.local();
    const provider = new anchor.Provider(connection, wallet, options);
    anchor.setProvider(provider);
    const idl = JSON.parse(
        require("fs").readFileSync("./first_try.json", "utf8")
    );
    const programId = new PublicKey(secret.PROGRAM_ID);
    const program = new anchor.Program(idl, programId);
    const TOKEN_METADATA_PROGRAM = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    const nft_price = 0.5 * LAMPORTS_PER_SOL;
    console.log("programId: ", programId.toBase58());

    const alice = Keypair.fromSecretKey(bs58.decode(secret.ALICE_SECRET_KEY));
    console.log("alice: ", alice.publicKey.toBase58());

    const nft_mint = new PublicKey(secret.NFT_MINT);
    console.log("nft mint: ", nft_mint.toBase58());


    const nft_ata = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        nft_mint,
        alice.publicKey
    );
    console.log("nft ata: ", nft_ata.toBase58());
    let accountInfo = await connection.getParsedAccountInfo(nft_ata);
    console.log("nft owner: ", accountInfo.value.data["parsed"]["info"]["owner"]);
    console.log("nft ata amount: ", accountInfo.value.data["parsed"]["info"]["tokenAmount"]["amount"]);

    const seed = nft_mint.toString().substring(0, 30);
    console.log("seed:    ", seed);
    const [_vault_account_pda, _vault_account_bump] = await PublicKey.findProgramAddress(
        [Buffer.from('v'.concat(seed))],
        programId
    );
    const vault_account_pda = _vault_account_pda;
    const vault_account_bump = _vault_account_bump;
    console.log("vault_account_pda: ", vault_account_pda.toBase58());

    const [_vault_authority_pda, _vault_authority_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode("vault_authority"))],
        programId
    );
    const vault_authority_pda = _vault_authority_pda;
    const vault_authority_bump = _vault_authority_bump;
    console.log("vault_authority_pda: ", vault_authority_pda.toBase58());

    const [_fiducie_pda, _fiducie_bump] = await PublicKey.findProgramAddress(
        [Buffer.from('d'.concat(seed))],
        programId
    );
    const fiducie_pda = _fiducie_pda;
    const fiducie_bump = _fiducie_bump;
    console.log("fiducie_pda:  ", fiducie_pda.toBase58());

    const tx = await program.rpc.withdraw({
        accounts: {
            sellerAccount: alice.publicKey,
            vaultAccount: vault_account_pda,
            vaultAuthority: vault_authority_pda,
            sellerAta: nft_ata,
            fiducieAccount: fiducie_pda,
            tokenProgram: TOKEN_PROGRAM_ID,
        },
        signers: [alice],
    });
    console.log("transaction: ", tx);

};

alice();