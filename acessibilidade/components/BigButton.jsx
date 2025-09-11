import React from "react";
import { Pressable, Text } from "react-native";

/**
 * @param {object} props
 * @param {string} props.title
 * @param {function} props.onPress
 * @param {object} [props.style]
 * @param {object} [props.textStyle]
 * @param {string} [props.accessibilityLabel]
 * @param {string} [props.accessibilityHint]
 * @param {string} [props.role]
 */
export default function BigButton({
  title,
  onPress,
  style,
  textStyle,
  accessibilityHint,
  accessibilityLabel,
  role = "button"
}) {
  return (
    <Pressable
      onPress={onPress}
      style={style}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole={role}
      android_ripple={{ color: "#00000022" }}
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}
