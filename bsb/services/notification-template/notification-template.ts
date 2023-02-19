import { IBooking } from "@jamalsoueidan/bsb.services.booking";
import { ICustomer } from "@jamalsoueidan/bsb.services.customer";
import { NotificationTemplateModel } from "@jamalsoueidan/bsb.services.notification-template";
import { SettingModel } from "@jamalsoueidan/bsb.services.setting";
import { IStaff } from "@jamalsoueidan/bsb.services.staff";
import { NotificationTemplate } from "@jamalsoueidan/bsb.types.notification-template";
import { Setting } from "@jamalsoueidan/bsb.types.setting";

import { format, formatRelative, subDays } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import da from "date-fns/locale/da";

interface GetMessageProps {
  shop: string;
  type: string;
}

interface GetMessageReturn extends Setting, NotificationTemplate {}

export const NotificationTemplateServiceGet = async ({
  type,
  shop,
}: GetMessageProps): Promise<GetMessageReturn | null> => {
  const setting = await SettingModel.findOne({ shop }).lean();
  const template = await NotificationTemplateModel.findOne({
    language: setting?.language,
    name: type,
    shop,
  }).lean();

  if (!template) {
    return null;
  }

  return {
    ...setting,
    ...template,
  } as any;
};

interface ReplaceMessageProps {
  receiver?: ICustomer | IStaff;
  booking?: Omit<IBooking, "_id">;
}

export const NotificationTemplateServiceReplace = (
  notificationTemplate: GetMessageReturn,
  replace: ReplaceMessageProps,
) => {
  let { message } = notificationTemplate;
  if (replace.receiver) {
    message = message.replace(/{fullname}/g, replace.receiver.fullname);
  }

  if (replace.booking) {
    message = message.replace(
      /{time}/g,
      formatRelative(
        utcToZonedTime(
          new Date(replace.booking.start),
          notificationTemplate.timeZone,
        ),
        utcToZonedTime(
          subDays(new Date(replace.booking.start), 1),
          notificationTemplate.timeZone,
        ),
        { locale: notificationTemplate.language !== "en-US" ? da : undefined },
      ),
    );
    message = message.replace(
      /{date}/g,
      format(
        utcToZonedTime(
          new Date(replace.booking.start),
          notificationTemplate.timeZone,
        ),
        "d. MMMM - HH:mm",
        {
          locale: notificationTemplate.language !== "en-US" ? da : undefined,
        },
      ),
    );
    message = message.replace(/{title}/g, replace.booking.title);
    message = message.replace(
      /{total}/g,
      replace.booking.lineItemTotal.toString(),
    );
  }

  return message;
};
