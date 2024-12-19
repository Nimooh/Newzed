import { Navbar } from "@/components/Navbar";
import { PostList } from "@/components/post/PostList";
import { ThemedText } from "@/components/ThemedText";
import { PostType } from "@/constants/PostType";
import { getDatas } from "@/functions/fs";
import { useThemeColors } from "@/hooks/useThemeColors";
import { setDatas } from "@/store/reducers/dataSlice";
import { RootState } from "@/store/store";
import {  useState } from "react";
import { KeyboardAvoidingView, Platform,  StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";


export default function Index() {
  const colors = useThemeColors()
  const datas = useSelector((state: RootState) => state.datas.datas);
  const dispatch = useDispatch();  
  const [dataLoaded, setDataLoaded] = useState(false)
  if(!dataLoaded) {
    getDatas().then((datas : PostType[]) => {
      dispatch(setDatas(datas))
      setDataLoaded(true)
    })
  }    
  return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
        <SafeAreaView style={[styles.root,{backgroundColor: colors.background}]}>
          <View style={ styles.body}>
          {datas.length!=0 ?
          <PostList postList={datas}/>:
          <ThemedText style={styles.nopost} variant="headline">No news for you :(</ThemedText>
          }
          </View>
          <Navbar/>          
        </SafeAreaView>
      </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  root: {
    flex:1,
  },
  body: {
    flex:1
  },
  nopost: {
    flex:1,
    textAlign:'center',
    alignItems:'center',
    verticalAlign:'middle'
    
  }
})