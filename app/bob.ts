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

const bob = async () => {
    const connection = new Connection("https://api.devnet.solana.com", "processed");
    const options = anchor.Provider.defaultOptions();
    const bob = Keypair.fromSecretKey(bs58.decode(secret.BOB_SECRET_KEY));
    const wallet = new NodeWallet(bob);
    const provider = new anchor.Provider(connection, wallet, options);
    anchor.setProvider(provider);
    const idl = JSON.parse(
        require("fs").readFileSync("./first_try.json", "utf8")
    );
    const programId = new PublicKey(secret.PROGRAM_ID);
    const program = new anchor.Program(idl, programId); const creator = new PublicKey(secret.DEFINFT_PUBLIC_KEY);
    const TOKEN_METADATA_PROGRAM = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    const nft_price = 0.5 * LAMPORTS_PER_SOL;
    console.log("programId: ", programId.toBase58());

    console.log("bob: ", bob.publicKey.toBase58());
    const alice = new PublicKey(secret.ALICE_PUBLIC_KEY);
    const nft_mint = new PublicKey(secret.NFT_MINT);
    console.log("nft mint: ", nft_mint.toBase58());


    const nft_ata = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        nft_mint,
        bob.publicKey
    );
    console.log("nft ata: ", nft_ata.toBase58());

    let accountInfo = await connection.getParsedAccountInfo(nft_ata);
    // Warning the associated token address ATA must initialized befor try to push a token( nft) inside.
    if (accountInfo.value == null) {

        let initATAtx = new Transaction();
        initATAtx.add(
            Token.createAssociatedTokenAccountInstruction(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                nft_mint,
                nft_ata,
                bob.publicKey,
                bob.publicKey,
            )
        );
        initATAtx.feePayer = bob.publicKey;
        await connection.sendTransaction(initATAtx, [bob]);
    } else {
        console.log("nft owner: ", accountInfo.value.data["parsed"]["info"]["owner"]);
        console.log("nft ata amount: ", accountInfo.value.data["parsed"]["info"]["tokenAmount"]["amount"]);

    }


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
    const [_nft_pda, _nft_bump] = await PublicKey.findProgramAddress(
        [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM.toBuffer(), nft_mint.toBuffer()],
        TOKEN_METADATA_PROGRAM
    );
    const nft_pda = _nft_pda;
    const tx = await program.rpc.exchange(
        {
            accounts: {
                buyerAccount: bob.publicKey,
                sellerAccount: alice,
                buyerAta: nft_ata,
                vaultAccount: vault_account_pda,
                vaultAuthority: vault_authority_pda,
                fiducieAccount: fiducie_pda,
                systemProgram: anchor.web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                nftMetadata: nft_pda,
                tokenMetadataProgram: TOKEN_METADATA_PROGRAM,
                creatorA: anchor.web3.Keypair.generate().publicKey,
                creatorB: new PublicKey("AXJkPgUdLUDDVrQcb36ZbWRKfmxH2EpsWSG3jyBn8krR"),
                creatorC: anchor.web3.Keypair.generate().publicKey,
                creatorD: creator,
                creatorE: anchor.web3.Keypair.generate().publicKey,
            },
            signers: [bob],
        }
    );
    console.log("transaction: ", tx);
};

bob();