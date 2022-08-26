const {loadProducts, storeProducts} = require('../data/productsModule');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		const products = loadProducts();

		return res.render('products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const product = products.find(product => product.id === +req.params.id);
		return(res.render('detail', {
			product,
			toThousand
		}));
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {name, price, discount, description, category} = req.body;
		const products = loadProducts();

		const newProduct = {
			id: (products[products.length - 1].id + 1),
			name: name.trim(),
			price: +price,
			discount: +discount,
			description: description.trim(),
			image:  req.file ? req.file.filename : 'default-image.png',
			category
		}
		const producstModify = [...products, newProduct];
		storeProducts(producstModify);

		return res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const product = products.find(product => product.id === +req.params.id);
		res.render('product-edit-form', {
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const {name, price, discount, category, description} = req.body;

		const producstModify = products.map(product => {
			if(product.id === +req.params.id){
				return {
					...product,
					name: name.trim(),
					price: +price,
					discount: +discount,
					description: description.trim(),
					category
				}
			}
			return product
	})
	storeProducts(producstModify);
	return res.redirect('/products/detail/' + req.params.id);
},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const {id} = req.params;
		const products = loadProducts();

		const productsDetroy = products.filter(product => product.id !== +id);

		storeProducts(productsDetroy);
		return res.redirect('/products');
	}
};

module.exports = controller;