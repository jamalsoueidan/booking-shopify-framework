import { Router } from "express";
import {
  widgetRouteAvailability,
  widgetRouteSettings,
  widgetRouteStaff,
} from "./widget.routes";

const widgetRouter = Router();

widgetRouter[widgetRouteStaff.method](
  widgetRouteStaff.route,
  widgetRouteStaff.middlewares,
);

widgetRouter[widgetRouteAvailability.method](
  widgetRouteAvailability.route,
  widgetRouteAvailability.middlewares,
);

widgetRouter[widgetRouteSettings.method](
  widgetRouteSettings.route,
  widgetRouteSettings.middlewares,
);

export { widgetRouter };
