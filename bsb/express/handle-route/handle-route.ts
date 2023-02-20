import { validationResult } from "express-validator";

export const handleRoute = (controller) => async (req, res) => {
  try {
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      return res.status(500).json({
        error: validate.mapped(),
        success: false,
      });
    }

    return res.status(200).json({
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
    return res.status(500).json({
      error,
      success: false,
    });
  }
};
