process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
let items = require('../fakeDb');

let bananas = { name: 'bananas', price: 3.75 };

beforeEach(function () {
	items.push(bananas);
});

afterEach(function () {
	// make sure this *mutates*, not redefines, `items`
	items.length = 0;
});
// end afterEach

/** GET /items - returns `{items: [item, ...]}` */

describe('GET /items', function () {
	test('Gets a list of items', async function () {
		const resp = await request(app).get(`/items`);
		expect(resp.statusCode).toBe(200);

		expect(resp.body).toEqual({ items: [bananas] });
	});
});
// end

/** GET /items/[name] - return data about one item: `{item: item}` */

describe('GET /items/:name', function () {
	test('Gets a single item', async function () {
		const resp = await request(app).get(`/items/${bananas.name}`);
		expect(resp.statusCode).toBe(200);

		expect(resp.body).toEqual({ item: bananas });
	});

	test("Responds with 404 if can't find item", async function () {
		const resp = await request(app).get(`/items/0`);
		expect(resp.statusCode).toBe(404);
	});
});
// end

/** POST /item - create item from data; return `{added: item}` */

describe('POST /items', function () {
	test('Creates a new item', async function () {
		const resp = await request(app).post(`/items`).send({
			name: 'yogurt',
			price: 6.5,
		});
		expect(resp.statusCode).toBe(201);
		expect(resp.body).toEqual({
			added: { name: 'yogurt', price: 6.5 },
		});
	});
});
// end

/** PATCH /items/[name] - update item; return `{updated: item}` */

describe('PATCH /items/:name', function () {
	test('Updates a single item', async function () {
		const resp = await request(app).patch(`/items/${bananas.name}`).send({
			name: 'plantains',
		});
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({
			updated: { name: 'plantains', price: bananas.price },
		});
	});

	test('Responds with 404 if id invalid', async function () {
		const resp = await request(app).patch(`/items/0`);
		expect(resp.statusCode).toBe(404);
	});
});
// end

/** DELETE /items/[name] - delete item,
 *  return `{message: "Deleted"}` */

describe('DELETE /items/:name', function () {
	test('Deletes a single a item', async function () {
		const resp = await request(app).delete(`/items/${bananas.name}`);
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({ message: 'Deleted' });
	});
});
// end
