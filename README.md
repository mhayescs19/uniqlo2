# Get subtotal

```
{
    tagIds: [
        hex1,
        hex2,
        hex3
    ]
}
```

const tags = []

const costs = [] = DynamoDBGet(tags) // do lookup on the Product table to match the ids

const subtotal = costs.sum()

send subtotal as response back to ESP 32

# Purchase

```
{
    tagIds: [
        hex1,
        hex2,
        hex3
    ]
}
```

DynamoDBAddPurchase(tags)

// purchase table

purchase_id
product_id
time

RFID
tag_id
payload: product uuid

tag_id == product uuid stored in db

payload.product uuid == product uuid stored in db

read tags in loop

read tag_1 -> tag_1 is read so recognize tag 1 again

what happens if there are two tag_1 s

only read tag_1 once
