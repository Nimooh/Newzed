import {StyleSheet ,Text, type TextProps} from "react-native"
import { useThemeColors } from "../hooks/useThemeColors" 
import { Colors } from "../constants/Colors"
const styles   = StyleSheet.create({
    headline: {
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: 32
    },
    subtitle1: {
        fontWeight: "bold",
        fontSize: 50,
        lineHeight: 52
    },
    subtitle2: {
        fontWeight: "bold",
        fontSize: 48,
        lineHeight: 50
    },
    username : {
        fontSize: 40,
        lineHeight: 42
    },
    body: {
        fontSize: 36,
        lineHeight: 40
    },
    caption: {
        fontSize: 30,
        lineHeight: 32
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

