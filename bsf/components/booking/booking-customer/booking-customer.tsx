/* eslint-disable jsx-a11y/anchor-is-valid */
import { Booking } from "@jamalsoueidan/bsb.types";
import { Link, Modal, TextContainer } from "@shopify/polaris";
import React, { memo } from "react";

export type BookingCustomerProps = { booking: Booking };

export const BookingCustomer = memo(({ booking }: BookingCustomerProps) => {
  const url = `https://${booking.shop}/admin/customers/${booking.customerId}`;

  return (
    <>
      <Modal.Section>
        <TextContainer>
          <strong>Fuldenavn:</strong>{" "}
          <Link url={url} external>
            {booking.customer.firstName} {booking.customer.lastName}
          </Link>
        </TextContainer>
      </Modal.Section>
      <Modal.Section>
        <TextContainer>
          <strong>email:</strong> {booking.customer.email || "-"}
        </TextContainer>
      </Modal.Section>
      <Modal.Section>
        <TextContainer>
          <strong>mobil:</strong> {booking.customer.phone || "-"}
        </TextContainer>
      </Modal.Section>
    </>
  );
});
