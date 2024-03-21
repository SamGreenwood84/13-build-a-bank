const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/categories/:id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/categories
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Bad request' });
  }
});

// PUT /api/categories/:id
router.put('/:id', async (req, res) => {
  try {
    const [updatedCount] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedCount === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Bad request' });
  }
});

// DELETE /api/categories/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedCount === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

