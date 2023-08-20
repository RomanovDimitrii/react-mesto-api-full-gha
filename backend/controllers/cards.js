const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');
const { UnallowedActionError } = require('../errors/UnallowedAction');

function getCards(req, res, next) {
  Card.find().populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((result) => result.populate(['owner', 'likes']).then((card) => res.status(201).send(card)))
    .catch(next);
}

function deleteCardById(req, res, next) {
  Card.findById(req.params.cardId) // Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка или пользователь не найден');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new UnallowedActionError('Нет прав на удаление карточки');
      }
      return Card.deleteOne(card).then(() => res.status(200).send(card));
    })
    .catch(next);
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка или пользователь не найден');
      }
      return res.status(200).send(card);
    })
    .catch(next);
}

function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка или пользователь не найден');
      }
      return res.status(200).send(card);
    })
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
