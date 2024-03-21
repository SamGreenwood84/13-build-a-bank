const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }]
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }]
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: newProduct.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Bad request' });
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const [updatedCount] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      await ProductTag.destroy({
        where: {
          product_id: req.params.id,
        },
      });

      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: req.params.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Bad request' });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedCount === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
