import React, { Children } from "react";
import { Text } from "react-native";

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {object} [props.style]
 * @param {number} [props.scale]
 * @param {object} rest
 */
export default function A11yText({ children, style, scale = 1, ...rest }) {
  return (
    <Text
      allowFontScaling={true}
      accessible={false}
      style={style}
      {...rest}
    >
      {children}
    </Text>
  );
}
