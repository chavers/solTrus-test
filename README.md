# solTrus-test

## init

```bash
chavers@chavers-desk:~/solana/source/solTrust-test$ yarn
yarn install v1.22.17
warning package.json: No license field
warning No license field
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 3.67s.
chavers@chavers-desk:~/solana/source/solTrust-test$
```

## usage

from app folder use ts-node to execute TS scripts. alice is the NFT owner to sell (alice.ts) bob is the buyer (bob.ts) alice can cancel the deal and redraw the NFT (withdraw.ts)


rename secrets.ts.sample and set the key for alice/bob and the nft

Alice sell a NFT
```bash
chavers@chavers-desk:~/solana/source/solTrust-test/app$ ts-node alice.ts
programId:  4cibLYTAbAxpszLU173SAi69x3yo55fy4pn3jxvnTvv4
alice:  C7PEtyoEecXjDkM8rkqpyW75Ueh5uGJ8549S9iLYkTzR
nft mint:  Bj1mAV6AYFn2t62hJQfhdmxT7N8MyNEn1YyoPJcgpGwu
nft ata:  H1obNypZHnVDBFqWTjWKA1fxP2Nz2XTdqEMS48MZZfDZ
nft owner:  C7PEtyoEecXjDkM8rkqpyW75Ueh5uGJ8549S9iLYkTzR
nft ata amount:  1
seed:     Bj1mAV6AYFn2t62hJQfhdmxT7N8MyN
vault_account_pda:  7qUqeJtjjtsiM2oqVpmd2PKphg8heiTkFDkHtsVsxN8C
vault_authority_pda:  A339Eg5nRNaPjy2CnQd1FMY2onUy6HyN2GECwNfukwJf
fiducie_pda:   2asW8EAnf799PuGpHeE2m5JRcqR2bnTqTEshuSRmVjPS
transaction:  5KzisapyWQxoCJRYhTxDXuFViXKh2mjEF9yzSjKHdxDe5gaCGipmUyMAWviTBXt9SJKu2q4oEe8EaUcLkXkGP2xo

```

Alice cancel the sell
```bash
chavers@chavers-desk:~/solana/source/solTrust-test/app$ ts-node withdraw.ts 
programId:  4cibLYTAbAxpszLU173SAi69x3yo55fy4pn3jxvnTvv4
alice:  C7PEtyoEecXjDkM8rkqpyW75Ueh5uGJ8549S9iLYkTzR
nft mint:  Bj1mAV6AYFn2t62hJQfhdmxT7N8MyNEn1YyoPJcgpGwu
nft ata:  H1obNypZHnVDBFqWTjWKA1fxP2Nz2XTdqEMS48MZZfDZ
nft owner:  C7PEtyoEecXjDkM8rkqpyW75Ueh5uGJ8549S9iLYkTzR
nft ata amount:  0
seed:     Bj1mAV6AYFn2t62hJQfhdmxT7N8MyN
vault_account_pda:  7qUqeJtjjtsiM2oqVpmd2PKphg8heiTkFDkHtsVsxN8C
vault_authority_pda:  A339Eg5nRNaPjy2CnQd1FMY2onUy6HyN2GECwNfukwJf
fiducie_pda:   2asW8EAnf799PuGpHeE2m5JRcqR2bnTqTEshuSRmVjPS
transaction:  27BGgtoi6VLyyetGmS5hTeP95TCZFw7TK8Whc8qiVoS2KugroNSQWYx49cott5FbBNtwrKH9STV2LdTaGTf5eMGF
```

bob buy the nft
```bash
chavers@chavers-desk:~/solana/source/solTrust-test/app$ ts-node bob.ts
programId:  4cibLYTAbAxpszLU173SAi69x3yo55fy4pn3jxvnTvv4
bob:  5jYWGcKESxKYFvUDUDFiKN1aMC4YAzt3RLvt5ahYKxxA
nft mint:  Bj1mAV6AYFn2t62hJQfhdmxT7N8MyNEn1YyoPJcgpGwu
nft ata:  BSUCviWBmy6AYme9B6vzVTbebngRUvRyqixHrWRh28W1
nft owner:  5jYWGcKESxKYFvUDUDFiKN1aMC4YAzt3RLvt5ahYKxxA
nft ata amount:  0
seed:     Bj1mAV6AYFn2t62hJQfhdmxT7N8MyN
vault_account_pda:  7qUqeJtjjtsiM2oqVpmd2PKphg8heiTkFDkHtsVsxN8C
vault_authority_pda:  A339Eg5nRNaPjy2CnQd1FMY2onUy6HyN2GECwNfukwJf
fiducie_pda:   2asW8EAnf799PuGpHeE2m5JRcqR2bnTqTEshuSRmVjPS
transaction:  5pZbSLiDTbUzGMhApc1MbHeCLsVofFQrWcgVH5phhnzVXiPHbf9bQrAwerd3qcK6c5f2hVeLE3oSrkKY4Z3giQ1x
```


list all NFT owned by smart contract
```bash
chavers@chavers-desk:~/solana/source/solTrust-test/app$ ts-node alltoken.ts 
pubkey: 7qUqeJtjjtsiM2oqVpmd2PKphg8heiTkFDkHtsVsxN8C
mint: Bj1mAV6AYFn2t62hJQfhdmxT7N8MyNEn1YyoPJcgpGwu
owner: A339Eg5nRNaPjy2CnQd1FMY2onUy6HyN2GECwNfukwJf
decimals: 0
amount: 1
====================
```
