import { validationResult } from "express-validator";

export const handleRoute = (controller) => async (req, res) => {
  try {
    const { errors } = validationResult(req) as any;
    if (errors.length) {
      throw errors;
    }

    res.status(202).send({
      payload: await controller({
        body: req.body,
        query: {
          shop: req.query.shop || req.session?.shop,
          ...req.query,
          ...req.params,
        },
        session: req.session,
      }),
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? `${error}` : error,
      success: false,
    });
  }
};
