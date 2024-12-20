import {StyleSheet ,Text, type TextProps} from "react-native"
import { useThemeColors } from "../hooks/useThemeColors" 
import { Colors } from "../constants/Colors"
const styles   = StyleSheet.create({
    headline: {
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: 26
    },
    subtitle1: {
        fontWeight: "bold",
        fontSize: 26,
        lineHeight: 32
    },
    subtitle2: {
        fontWeight: "bold",
        fontSize: 22,
        lineHeight: 24
    },
    username : {
        fontSize: 20,
        lineHeight: 22
    },
    body: {
        fontSize: 12,
        lineHeight: 14
    },
    caption: {
        fontSize: 10,
        lineHeight: 12
    },
    button: {
        fontSize: 16,
        lineHeight: 18
    }
})


type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: keyof typeof Colors["light"]
}

export function ThemedText ( {variant, color, style, ...rest}: Props){
    const colors = useThemeColors()
    return <Text style={[styles[variant ?? 'body'], {color: colors[color ?? "primary"]}, style]} {...rest}>
        
    </Text>
}

