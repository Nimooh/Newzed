import { PostType } from "@/constants/PostType";
import { Card } from "../Card";
import { ThemedText } from "../ThemedText";
import { Row } from "../Row";
import { Image, Pressable, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { OptionButton } from "./OptionButton";

type Props = {
    post : PostType
}

export function Post({post}: Props){
    const colors = useThemeColors()
    return(
        <Card style={[styles.post]}>
            <Row style={[styles.header]}>
                <Row gap={6}>
                    <Image source={require('@/assets/images/user.png')} style={styles.icon}/>
                    <ThemedText>User{post.userId}</ThemedText>
                </Row>
                <OptionButton post={post}/>
            </Row>
            { post.text &&
            <ThemedText>{post.text}</ThemedText>
            }
            { post.image &&
            <Image source={{uri : post.image}} style={styles.image}/>
            }
            <Row style={{justifyContent:'flex-end'}}>
                <ThemedText>{post.date}</ThemedText>
            </Row>
        </Card>
    )
}

const styles = StyleSheet.create({
    post: {
        flex:1,
        paddingVertical:15,
        paddingHorizontal:10,
        gap:10,
        
    },
    header: {
        flex:1,
        justifyContent:'space-between',
        
        paddingVertical:10
    },
    icon: {
        height:30,
        width:30
    },
    image: {
        width:'100%',
        aspectRatio:4/3

    }
  
})