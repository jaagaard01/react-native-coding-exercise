import { StyleProp, ViewStyle } from "react-native";

import { SvgXml } from "react-native-svg";

interface SortIconProps {
  style?: StyleProp<ViewStyle>;
  rotate?: boolean;
}

export function SortIcon({ style, rotate = false }: SortIconProps) {
  const rotationStyle: StyleProp<ViewStyle> = rotate
    ? { transform: [{ rotate: "180deg" }] }
    : {};

  return (
    <SvgXml
      style={[style, rotationStyle]}
      xml={`
               <svg xmlns="http://www.w3.org/2000/svg" width="11.814" height="13.784" viewBox="0 0 11.814 13.784">
                   <path d="M15.526 10.573 10.6 15.5a.984.984 0 0 1-1.392 0l-4.919-4.927A.984.984 0 0 1 5.681 9.18l3.242 3.242V2.985a.985.985 0 0 1 1.969 0v9.438l3.242-3.243a.984.984 0 1 1 1.392 1.392z" transform="translate(-4 -2)" style="fill:#193247"/>
               </svg>                
            `}
    />
  );
}
