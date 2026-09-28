

## Part 1 — PostgreSQL Query

To get products with prices between $50 and $200 sorted from cheapest to expensive

```sql
SELECT *
FROM products
WHERE price BETWEEN 50 AND 200 ORDER BY price ASC, id ASC LIMIT 10 
OFFSET 0;
```

page 2 

```sql
SELECT *
FROM products
WHERE price BETWEEN 50 AND 200 ORDER BY price ASC, id ASC LIMIT 10
OFFSET 10;
```

and so on but in a scale a better approach is to use keyset pagination because in the previous one postgresql stiil needs to go through all pages before offset

like this 
```sql
SELECT *
FROM products
WHERE price BETWEEN 50 AND 200 AND (price > $1 OR (price = $1 AND id > $2)) ORDER BY price ASC, id ASC
LIMIT 10;
```

## Part 2 — PostgreSQL Optimization

Because the query is filtering using price and sorting using price and id I need to create index

```sql
CREATE INDEX idx_products_price_id
ON products (price ASC, id ASC);
```



## Part 3 — MongoDB Query

```js
db.products
  .find({ category: "Electronics" }).sort({ price: -1, _id: 1 }).skip(0).limit(5);
```

page 2

```js
db.products
  .find({ category: "Electronics" }).sort({ price: -1, _id: 1 }).skip(5).limit(5);
```

_id keeps the order stable when products have the same price

For large pages skip can become slower because mongodb still skips previous documents


## Part 4 — MongoDB Optimization

```js
db.products.createIndex({
  category: 1,
  price: -1,
  _id: 1
});
```

This index matches the filter and sorting fields now mongodb can find and return the documents more efficient

## Part 5 — Caching

For high traffic I can cache common product lists in redis.

Example key =>  products:electronics:page:1


If the key exists, return cached data

If not query mongodb save the result in redis  then return it

When products change related cache keys should be updated to prevent cache Inconsistency