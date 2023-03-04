import { Staff } from "@jamalsoueidan/backend.types.staff";
import { HelperArray } from "@jamalsoueidan/frontend.helpers.helper-array";
import { Avatar, AvatarProps } from "@shopify/polaris";
import React, { useMemo } from "react";
import styled from "styled-components";

export type StaffAvatarStackProps = {
  staff: Staff[];
  size: AvatarProps["size"];
};

const DEFAULT_SIZE: AvatarProps["size"] = "medium";

export const StaffAvatarStack = ({
  staff,
  size = DEFAULT_SIZE,
}: StaffAvatarStackProps) => {
  const staffMarkup = useMemo(
    () =>
      [...staff]
        .sort(HelperArray.sortByText((d) => d.fullname))
        .map(({ _id, fullname, avatar }) => (
          <StaffAvatarItemStyled key={_id} size={size} length={staff.length}>
            <Avatar customer size={size} name={fullname} source={avatar} />
          </StaffAvatarItemStyled>
        )),
    [size, staff],
  );

  return (
    <StaffAvatarStackStyled size={size}>{staffMarkup}</StaffAvatarStackStyled>
  );
};

const sizes: Record<string, string[]> = {
  extraSmall: ["1.5", "0.5"],
  large: ["3.75", "1.5"],
  medium: ["2.5", "1"],
  small: ["2", "0.75"],
};

type StyledAvatarItemStyledProps = {
  size: string;
  length: number;
};

const StaffAvatarStackStyled = styled.div<
  Pick<StyledAvatarItemStyledProps, "size">
>`
  display: flex;
  list-style-type: none;
  margin: auto;
  padding: 0px;
  flex-direction: row;
  padding-right: ${(props) => `${sizes[props.size][1]}rem`};
`;

// https://codepen.io/landrik/pen/pGVJbq
const StaffAvatarItemStyled = styled.div<StyledAvatarItemStyledProps>`
  border: 2px solid #fff;
  border-radius: 100%;
  display: block;
  height: ${(props) => `${sizes[props.size][0]}rem`};
  width: ${(props) => `${sizes[props.size][0]}rem`};
  text-align: center;
  overflow: hidden;
  margin-right: -${(props) => `${sizes[props.size][1]}rem`};

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
