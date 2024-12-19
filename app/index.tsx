import { Navbar } from "@/components/Navbar";
import { PostList } from "@/components/post/PostList";
import { PostType } from "@/constants/PostType";
import { deleteAll, getDatas } from "@/functions/fs";
import { useThemeColors } from "@/hooks/useThemeColors";
import { setDatas } from "@/store/reducers/dataSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform,  StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";


export default function Index() {
  const colors = useThemeColors()
  const datas = useSelector((state: RootState) => state.datas.datas);
  const dispatch = useDispatch();  
  
  if(datas.length==0){
    console.log("Init Datas")
    getDatas().then((datas : PostType[]) => {
      dispatch(setDatas(datas))
      console.log('Datas : ',datas)
  })
    
  } 
  useEffect(()=> {

    console.log(datas)

  },[datas])
  return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
        <SafeAreaView style={[styles.root,{backgroundColor: colors.background}]}>
          {datas &&
          <PostList postList={datas}/>
          }
          <Navbar/>          
        </SafeAreaView>
      </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  root: {
    flex:1,
  },
})