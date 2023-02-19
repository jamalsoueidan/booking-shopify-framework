/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Booking,
  BookingFulfillmentStatus,
} from "@jamalsoueidan/bsb.types.booking";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useModal } from "@jamalsoueidan/bsf.hooks.use-modal";
import { Banner, Link, Modal, TextContainer } from "@shopify/polaris";
import { differenceInHours, isAfter } from "date-fns";
import React, { useEffect } from "react";
import { NavigateFunction } from "react-router-dom";

export type BookingViewProps = {
  booking: Booking;
  navigate: NavigateFunction;
};

export const BookingView = ({ booking, navigate }: BookingViewProps) => {
  const orderUrl = `https://${booking.shop}/admin/orders/${booking.orderId}`;
  const productUrl = `https://${booking.shop}/admin/products/${booking.productId}`;

  const { format, toTimeZone, formatRelative } = useDate();
  const { setSecondaryActions } = useModal();

  useEffect(() => {
    if (
      !!booking.fulfillmentStatus &&
      isAfter(new Date(booking.start), new Date())
    ) {
      setSecondaryActions([
        {
          content: "Ændre dato/tid",
          onAction() {
            navigate("edit");
          },
        },
      ]);
    }

    return () => {
      setSecondaryActions(undefined);
    };
  }, [setSecondaryActions, booking, navigate]);

  return (
    <>
      {booking.fulfillmentStatus === BookingFulfillmentStatus.CANCELLED && (
        <Modal.Section>
          <Banner title="Behandling annulleret">
            <p>Dette behandling er blevet annulleret.</p>
          </Banner>
        </Modal.Section>
      )}
      {booking.fulfillmentStatus === BookingFulfillmentStatus.REFUNDED && (
        <Modal.Section>
          <Banner title="Behandling refunderet" status="critical">
            <p>Dette behandling er blevet refunderet.</p>
          </Banner>
        </Modal.Section>
      )}
      {booking.isEdit &&
        booking.fulfillmentStatus !== BookingFulfillmentStatus.CANCELLED &&
        booking.fulfillmentStatus !== BookingFulfillmentStatus.REFUNDED && (
          <Modal.Section>
            <Banner title="Behandling har skiftet dato" status="info">
              <p>Dette behandlingtid er blevet ændret.</p>
            </Banner>
          </Modal.Section>
        )}
      {booking.fulfillmentStatus === BookingFulfillmentStatus.FULFILLED && (
        <Modal.Section>
          <Banner title="Behandling er gennemført" status="success">
            <p>Dette behandling er blevet gennemført.</p>
          </Banner>
        </Modal.Section>
      )}
      {!booking.fulfillmentStatus && (
        <Modal.Section>
          <Banner title="Behandling ikke gennemført" status="warning">
            <p>Dette behandling er stadig ikke gennemført.</p>
          </Banner>
        </Modal.Section>
      )}
      {booking.fulfillmentStatus === BookingFulfillmentStatus.BOOKED && (
        <Modal.Section>
          <Banner title="Behandling er booket af medarbejder">
            <p>Dette behandling er blevet booket af medarbejder</p>
          </Banner>
        </Modal.Section>
      )}
      <Modal.Section>
        <TextContainer>
          <strong>Ordre:</strong>{" "}
          {booking.orderId ? (
            <Link url={orderUrl} external>
              {booking.orderId.toString()}
            </Link>
          ) : (
            "Booket af medarbejder"
          )}
        </TextContainer>
      </Modal.Section>

      <Modal.Section>
        <TextContainer>
          <strong>Behandling:</strong>{" "}
          <Link url={productUrl} external>
            {booking.product.title}
          </Link>
        </TextContainer>
      </Modal.Section>

      <Modal.Section>
        <TextContainer>
          <strong>Dato:</strong> {format(booking.start, "PPP")}{" "}
          <i>({formatRelative(toTimeZone(booking.start))})</i>
        </TextContainer>
      </Modal.Section>

      <Modal.Section>
        <TextContainer>
          <strong>Tidspunkt:</strong> {format(booking.start, "p")} -{" "}
          {format(booking.end, "p")} (
          <i>
            {differenceInHours(new Date(booking.end), new Date(booking.start))}{" "}
            time)
          </i>
        </TextContainer>
      </Modal.Section>

      <Modal.Section>
        <TextContainer>
          <strong>Hos:</strong> {booking.staff?.fullname}{" "}
          {booking.anyAvailable && <i>(Enhver tilgængelig)</i>}
        </TextContainer>
      </Modal.Section>

      {booking.timeZone && (
        <Modal.Section>
          <TextContainer>
            <strong>Tidszone:</strong> {booking.timeZone}
          </TextContainer>
        </Modal.Section>
      )}

      {booking.lineItemTotal > 0 && (
        <Modal.Section>
          <TextContainer>
            <strong>
              Kunden har bestilt {booking.lineItemTotal} behandlinger i dette
              ordre.
            </strong>
          </TextContainer>
        </Modal.Section>
      )}
    </>
  );
};
