import { PostType } from "@/constants/PostType";
import { FlatList, StyleSheet } from "react-native";
import { Post } from "./Post";

type Props = {
    postList : PostType[]
}

export function PostList({postList} :Props) {
    console.log('PostList')
    console.log(postList)
    return (
        <FlatList 
        data={postList}
        numColumns={3}
        contentContainerStyle={[styles.gridGap, styles.list]}
        columnWrapperStyle={styles.gridGap}
        renderItem={({item}) => <Post post={item}/>
       }/>


)}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 16
  },
  gridGap: {
    gap: 8
  },
  list: {
    padding: 12,
  },
  form: {
    paddingHorizontal: 12
  }
})