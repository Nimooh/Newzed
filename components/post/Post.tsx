import { PostType } from "@/constants/PostType";
import { Card } from "../Card";
import { ThemedText } from "../ThemedText";
import { Row } from "../Row";
import { Image } from "react-native";

type Props = {
    post : PostType
}

export function Post({post}: Props){
    return(
        <Card>
            <Row></Row>
            { post.text &&
            <ThemedText>{post.text}</ThemedText>
            }
            { post.image &&
            <Image source={{uri : post.image}}/>
            }
        </Card>
    )


}