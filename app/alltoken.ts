import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { bs58, utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";

(async () => {
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const owner = new PublicKey("A339Eg5nRNaPjy2CnQd1FMY2onUy6HyN2GECwNfukwJf");
  let response = await connection.getParsedTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM_ID });
  let tt = response.value.forEach((accountInfo) => { //accountInfo.pubkey.toBase58()}).tolist();
  // console.log(response.value.map(x => x.pubkey.toBase58()));
  console.log(`pubkey: ${accountInfo.pubkey.toBase58()}`);
  console.log(`mint: ${accountInfo.account.data["parsed"]["info"]["mint"]}`);
  console.log(`owner: ${accountInfo.account.data["parsed"]["info"]["owner"]}`);
  console.log(`decimals: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["decimals"]}`);
  console.log(`amount: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["amount"]}`);
  console.log("====================")
});
}) ();
