import { Staff } from "@jamalsoueidan/backend.types.staff";
import { HelperArray } from "@jamalsoueidan/frontend.helpers.helper-array";
import { Avatar, AvatarProps } from "@shopify/polaris";
import React, { useMemo } from "react";
import styled from "styled-components";

export type StaffAvatarStackProps = {
  staff: Staff[];
  size: AvatarProps["size"];
};

export const StaffAvatarStack = ({ staff, size }: StaffAvatarStackProps) => {
  const staffMarkup = useMemo(
    () =>
      [...staff]
        .sort(HelperArray.sortByText((d) => d.fullname))
        .map(({ _id, fullname, avatar }) => (
          <StaffAvatarItemStyled
            key={_id}
            size={size || "medium"}
            length={staff.length}
          >
            <Avatar customer size={size} name={fullname} source={avatar} />
          </StaffAvatarItemStyled>
        )),
    [size, staff],
  );

  return <StaffAvatarStackStyled>{staffMarkup}</StaffAvatarStackStyled>;
};

const sizes: Record<string, string[]> = {
  extraSmall: ["1.5", "0.5"],
  large: ["3.75", "1.5"],
  medium: ["2.5", "1"],
  small: ["2", "0.75"],
};

const StaffAvatarStackStyled = styled.div`
  display: flex;
  list-style-type: none;
  margin: auto;
  padding: 0px;
  flex-direction: row;
`;

type StyledAvatarItemStyledProps = {
  size: string;
  length: number;
};

// https://codepen.io/landrik/pen/pGVJbq
const StaffAvatarItemStyled = styled.div<StyledAvatarItemStyledProps>`
  border: 2px solid #fff;
  border-radius: 100%;
  display: block;
  height: ${(props) => `${sizes[props.size][0]}rem`};
  width: ${(props) => `${sizes[props.size][0]}rem`};
  text-align: center;
  overflow: hidden;
  margin-left: -${(props) => `${sizes[props.size][1]}rem`};

  ${(props) => getIndex(props)}
`;

const getIndex = (props: StyledAvatarItemStyledProps) => {
  let str = "";
  for (let index = props.length; index > 0; index -= 1) {
    str += `
       &:nth-child(${index}) {
        z-index: ${props.length - index};
       }
    `;
  }
  return str;
};
