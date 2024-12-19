import {  type ViewProps, type ViewStyle } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import { PostButton } from "./post/PostButton";
import { Row } from "./Row";

type Props = ViewProps

export function Navbar ({style,  ...rest}: Props) {
    const colors = useThemeColors()
    return (
    <Row style={[styles]}>
                <PostButton/>
            </Row>
)}

const styles ={
    width:'100%',
    padding:10,
    opacity:0.5,
    backgroundColor: '#000000',
    justifyContent: 'center',
    
} satisfies ViewStyle