import {  View, type ViewProps, type ViewStyle } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

type Props = ViewProps

export function Card ({style, ...rest}: Props) {
    const colors = useThemeColors()
    return <View style={[style, styles, {backgroundColor: colors.background}]} {...rest}/>

}

const styles ={
     borderRadius: 8,
     overflow: 'hidden',
} satisfies ViewStyle