import mongoose from 'mongoose';

const validateId = (req, res, next) => {
  // Validate objectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid ID.');
  } else next();
};

export { validateId };
