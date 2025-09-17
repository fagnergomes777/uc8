import React from "react";
import {Text} from "react-native";
/**
 * @param {React.ReactNode} children
 * @param {object} style
 * @param {number} scale
 * @param {object} rest
 */
export default function A11yText({ children, style, scale = 1, ...rest }){
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
