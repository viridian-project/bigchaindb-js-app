## Note

Gave up on using BigchainDB for Viridian development, because their modeling
concept seemed inappropriate. It is centered around assets that are owned by one
single person, secured by their public/private key so that only that owning
person can modify the asset, e.g. transfer ownership to another person.

This seems too inflexible. Viridian is supposed to be a social network/wiki like
system where every participant is allowed to add/change/correct information.

## Setup

```
$ npm i bigchaindb-driver
$ npm i bigchaindb-orm
```

