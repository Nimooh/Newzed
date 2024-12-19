import { PostType } from "@/constants/PostType";
import { FlatList, StyleSheet } from "react-native";
import { Post } from "./Post";

type Props = {
    postList : PostType[]
}

export function PostList({postList} :Props) {
    return (
        <FlatList 
        data={postList}
        contentContainerStyle={[styles.gridGap]}
        renderItem={({item}) => <Post post={item}/>
       } keyExtractor={(item) => item.id.toString()} />

)}

const styles = StyleSheet.create({
  gridGap: {
    gap: 20
  }
})