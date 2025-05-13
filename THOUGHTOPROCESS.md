## Thought Process of Leaky Bucket Challenge Implementation

[Leaky bucket challenge description](https://github.com/woovibr/jobs/blob/main/challenges/woovi-leaky-bucket-challenge.md)

#### Acronyms:
- DICT: Diretório de Indentificadores de Contas Transacionais

### Requirements
- DICT API uses mTLS, [guide for pix security](https://www.bcb.gov.br/content/estabilidadefinanceira/cedsfn/Manual_de_Seguranca_PIX.pdf)
- For the rate-limiting policy, DICT uses the [token bucket](https://en.wikipedia.org/wiki/Token_bucket) algorithm.
- A rate-limiting policy is associated with a scope, which can be an end user or the participant. Each policy has a token replenishment rate, a bucket size, and a counting rule.
- Idempotent 
- Multi-Tenancy Stratey, request owner

### Leaky Bucket Strategy for This challege
- The bucket have the maximum capacity of 10 tokens.
- The request adds 1 token. If Success it don't add the token, if it fails it fill the bucket with that one token.
- Every one hour the bucket leaks 1 token.
