const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET /api/tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/tags/:id
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/tags
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Bad request' });
  }
});

// PUT /api/tags/:id
router.put('/:id', async (req, res) => {
  try {
    const [updatedCount] = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedCount === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Bad request' });
  }
});

// DELETE /api/tags/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (deletedCount === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
