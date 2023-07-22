"use strict"

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: { model: Product }
  })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: { model: Product }
  })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      // if there's products, we need to create pairings to bulk create in the Product model
      if (req.body.categoryIds.length) {
        const tagProductIdArr = req.body.categoryIds.map((product_id) => {
          return {
            tag_id: tag.id,
            product_id,
          }
        });

        return ProductTag.bulkCreate(tagProductIdArr);
      }

      // if no product tags, just respond;
      res.status(200).json(tag)
    })
    .then((tagProductIdArr) => res.status(200).json(tagProductIdArr))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: { id: req.params.id }
    })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: `There is no Tag with ID: ${req.params.id}` });
        return;
      }

      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete tag by id
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ 
    where: { id: req.params.id }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ 
            message: `There is no Tag with ID: ${req.params.id}` 
        });

        return;
      }

      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;