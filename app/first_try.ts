export type FirstTry = {
  "version": "0.1.0",
  "name": "first_try",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "sellerAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fiducieAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultAccountSeed",
          "type": "string"
        },
        {
          "name": "vaultAccountBump",
          "type": "u8"
        },
        {
          "name": "fiducieAccountBump",
          "type": "u8"
        },
        {
          "name": "nftPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "sellerAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fiducieAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "exchange",
      "accounts": [
        {
          "name": "buyerAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sellerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fiducieAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "creatorA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorE",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "sharefee",
      "accounts": [
        {
          "name": "oneAdmin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "devFront",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "devBack",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashbackPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashbackAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setfee",
      "accounts": [
        {
          "name": "oneAdmin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "cashbackPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashbackAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "cashbackBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "fiducieAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sellerKey",
            "type": "publicKey"
          },
          {
            "name": "sellerAta",
            "type": "publicKey"
          },
          {
            "name": "nftPrice",
            "type": "u64"
          },
          {
            "name": "nftMint",
            "type": "publicKey"
          },
          {
            "name": "vaultAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "marketplaceFee",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cashBack",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};

export const IDL: FirstTry = {
  "version": "0.1.0",
  "name": "first_try",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "sellerAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fiducieAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultAccountSeed",
          "type": "string"
        },
        {
          "name": "vaultAccountBump",
          "type": "u8"
        },
        {
          "name": "fiducieAccountBump",
          "type": "u8"
        },
        {
          "name": "nftPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "sellerAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fiducieAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "exchange",
      "accounts": [
        {
          "name": "buyerAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sellerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fiducieAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "creatorA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorE",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "sharefee",
      "accounts": [
        {
          "name": "oneAdmin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "devFront",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "devBack",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashbackPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashbackAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setfee",
      "accounts": [
        {
          "name": "oneAdmin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "cashbackPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashbackAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "cashbackBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "fiducieAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sellerKey",
            "type": "publicKey"
          },
          {
            "name": "sellerAta",
            "type": "publicKey"
          },
          {
            "name": "nftPrice",
            "type": "u64"
          },
          {
            "name": "nftMint",
            "type": "publicKey"
          },
          {
            "name": "vaultAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "marketplaceFee",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cashBack",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};
