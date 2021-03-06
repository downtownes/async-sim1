module.exports = {
    getShelf: (req, res, next) => {
        const db = req.app.get('db');

        db.get_shelf(req.params.id).then(shelf => {
            console.log(req.params.shelf)
            console.log(shelf);
            res.status(200).send(shelf)
        })
    },

    getBin: (req, res, next) => {
        const db = req.app.get('db');

        db.get_bins(req.params.id).then(bins => {
            console.log('bin', bins);
            let maxBins = 5;
            let container = [];

            for (var i = 0; i < maxBins; i++) {
                if (bins[i]) {
                    container[bins[i].bin - 1] = bins[i];
                } else if (!bins[i]) {
                    bins[i] = null;
                }
            }
            console.log('bins', bins);
            res.status(200).send(bins)
        })
    },

    getProduct: (req, res, next) => {
        const db = req.app.get('db');

        db.get_product(req.params.id[0], req.params.id[1]).then(product => {
            res.status(200).send(product);
        })
    },

    addBin: (req, res, next) => {
        const db = req.app.get('db');

        //74M
        db.get_product([req.params.id[0], req.params.id[1]]).then(items => {
            console.log('items', items);
            if (items.length === 0) {
                db.add_item([req.params.id[0], req.params.id[1], req.body.prod_name, req.body.price, req.body.picture]).then(newItem => {
                    console.log('newItem', newItem)
                    //74HI
                    //74L
                    res.status(200).send(newItem)
                })
            } else {
                res.status(200).send('Bin is full!')
            }
        })
    },

    updateBin: (req, res, next) => {
        const db = req.app.get('db');
        console.log(req.body);

        db.update_bin([req.params.id[0], req.params.id[1], req.body.name, req.body.price, req.body.picture]).then(updated => {
            console.log('updated', updated)
        })
    },

    deleteProduct: (req, res, next) => {
        const db = req.app.get('db');

        db.delete_item(req.params.id[0], req.params.id[1]).then(byebye => {
            res.status(200).send(byebye);
        })
    }
}