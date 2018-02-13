UPDATE shelf
SET prod_name = $3, price = $4, picture = $5
WHERE shelf = $1 AND bin = $2;