const { Like } = require("../models");
const { validateJwtMiddleware } = require("../auth");

// add a like
const addLike = [
  validateJwtMiddleware,
  async (req, res, next) => {
    try {
      const like = await Like.create(
        {
          userId: req.user.id,
          messageId: req.body.messageId
        },
        { raw: true }
      );
      res.send({ like });
    } catch (err) {
      next(err);
    }
  }
];
// remove a like
const removeLike = [
  validateJwtMiddleware,
  async (req, res, next) => {
    try {
      const destroyedCount = await Like.destroy({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      });
      if (destroyedCount === 0) {
        next({
          statusCode: 404,
          message: "Like does not exist"
        });
        return;
      }
      res.send({ id: req.params.id });
    } catch (err) {
      next(err);
    }
  }
];

module.exports = {
  addLike,
  removeLike
};
