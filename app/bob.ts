import * as anchor from '@project-serum/anchor';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
} from "@solana/web3.js";
import { bs58, utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import secret from './secret';

const bobrun = async () => {
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
    const program = new anchor.Program(idl, programId);
    const creator = new PublicKey(secret.CREATOR_PUBLIC_KEY);
    const TOKEN_METADATA_PROGRAM = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    console.log("programId: ", programId.toBase58());
    const cb = new PublicKey("GXZJ4BvQzK7JcsEaWzNSVYeLmpZiNB1Kco59uLsDjq8X"); //cash back publickey
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




    const seed = nft_mint.toString().substring(0, 30);
    console.log("seed:    ", seed);
    const [_vault_account_pda, _vault_account_bump] = await PublicKey.findProgramAddress(
        [Buffer.from('v'.concat(seed))],
        programId
    );
    const vault_account_pda = _vault_account_pda;
    console.log("vault_account_pda: ", vault_account_pda.toBase58());

    const [_vault_authority_pda, _vault_authority_bump] = await PublicKey.findProgramAddress(
        [Buffer.from(utf8.encode("vault_authority"))],
        programId
    );
    const vault_authority_pda = _vault_authority_pda;
    console.log("vault_authority_pda: ", vault_authority_pda.toBase58());

    const [_fiducie_pda, _fiducie_bump] = await PublicKey.findProgramAddress(
        [Buffer.from('d'.concat(seed))],
        programId
    );
    const fiducie_pda = _fiducie_pda;
    console.log("fiducie_pda:  ", fiducie_pda.toBase58());
    const [_nft_pda, _nft_bump] = await PublicKey.findProgramAddress(
        [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM.toBuffer(), nft_mint.toBuffer()],
        TOKEN_METADATA_PROGRAM
    );
    const nft_pda = _nft_pda;
    const [_cash_back_pda, _cash_back_bump] = await PublicKey.findProgramAddress(
        [cb.toBuffer() ],
        programId
    );
    const cashback_pda = _cash_back_pda;
    console.log("cashback_pda:  ", cashback_pda.toBase58());
    // let trx = new Transaction().add(
    //     Token.createCloseAccountInstruction(
    //       TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    //       nft_ata, // token account which you want to close
    //       bob.publicKey, // destination
    //       bob.publicKey, // owner of token account
    //       [] // for multisig
    //     )
    //   );

    //   console.log(`txhash: ${await connection.sendTransaction(trx, [bob /* fee payer + owner */])}`);

    let initATAtx = new Transaction();
    initATAtx.feePayer = bob.publicKey;
    let accountInfo = await connection.getParsedAccountInfo(nft_ata);
    // // Warning the associated token address ATA must initialized befor try to push a token( nft) inside.
    if (accountInfo.value == null) {
        console.log("nft ata not init ");
        // initATAtx.add(
        //     Token.createAssociatedTokenAccountInstruction(
        //         ASSOCIATED_TOKEN_PROGRAM_ID,
        //         TOKEN_PROGRAM_ID,
        //         nft_mint,
        //         nft_ata,
        //         bob.publicKey,
        //         bob.publicKey,
        //     )
        // );
    } else {
        console.log("nft owner: ", accountInfo.value.data["parsed"]["info"]["owner"]);
        console.log("nft ata amount: ", accountInfo.value.data["parsed"]["info"]["tokenAmount"]["amount"]);
    }
    initATAtx.add(program.instruction.exchange(
        {
            accounts: {
                buyerAccount: bob.publicKey, // want to buy nft
                sellerAccount: alice, // nft seller
                buyerAta: nft_ata, // buyer (ata) associated token address where we deliver the nft
                vaultAccount: vault_account_pda, // marketplace ata where nft is currently store
                vaultAuthority: vault_authority_pda, // marketplace signer (owner of ata)
                fiducieAccount: fiducie_pda, // on-chaine agreement with current deal information
                systemProgram: anchor.web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                nftMetadata: nft_pda, // nft metadata, need to check  creator list, creator fees... 
                cashbackPda: cashback_pda, // on-chaine agreement with marketplace owner information
                cashbackAccount: cb, // marketplace owner
                creatorA: anchor.web3.Keypair.generate().publicKey, // nft owner 1 ...
                creatorB: anchor.web3.Keypair.generate().publicKey,
                creatorC: anchor.web3.Keypair.generate().publicKey,
                creatorD: creator,
                creatorE: anchor.web3.Keypair.generate().publicKey, // nft owner 5 ...
            },
        }
    ));
    const tx = await connection.sendTransaction(initATAtx, [bob]);
    console.log("transaction: ", tx);

};

bobrun();