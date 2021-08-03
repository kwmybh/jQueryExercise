const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
let items = require('../fakeDb');

router.get('/', function (req, res) {
	res.json({ items });
});

router.post('/', function (req, res, next) {
	try {
		const { name, price } = req.body;
		if (!name) throw new ExpressError('Name of item required', 400);
		if (!price) throw new ExpressError('Price of item required', 400);
		const newItem = { name, price };
		items.push(newItem);
		return res.status(201).json({ added: newItem });
	} catch (e) {
		return next(e);
	}
});

router.get('/:name', function (req, res) {
	const foundItem = items.find((item) => item.name === req.params.name);
	if (foundItem === undefined) {
		throw new ExpressError('Item not found', 404);
	}
	res.json({ item: foundItem });
});

router.patch('/:name', function (req, res) {
	const foundItem = items.find((item) => item.name === req.params.name);
	if (foundItem === undefined) {
		throw new ExpressError('Item not found', 404);
	}
	foundItem.name = req.body.name;
	foundItem.price = req.body.price;
	res.json({ updated: foundItem });
});

router.delete('/:name', function (req, res) {
	const foundItem = items.find((item) => item.name === req.params.name);
	if (foundItem === undefined) {
		throw new ExpressError('Item not found', 404);
	}
	items = items.filter((item) => item.name !== foundItem.name);
	res.json({ message: 'Deleted' });
});

module.exports = router;
