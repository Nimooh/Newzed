import { Pressable,   Modal, View, StyleSheet, TextInput, Keyboard } from "react-native"
import { ThemedText } from "../ThemedText"
import { Card } from "../Card"
import { useThemeColors } from "@/hooks/useThemeColors"
import { PostType } from "@/constants/PostType"
import ImagePicker from "../ImagePicker"
import { useState } from "react"
import { Row } from "../Row"
import { addPostData, getDatas } from "@/functions/fs"
import { setDatas } from "@/store/reducers/dataSlice"
import { useDispatch } from "react-redux"

type Props = {
    visible: boolean
    setVisible: Function
    post?:PostType
   
}

export function PostForm ({visible, setVisible ,post}: Props ){
    const colors = useThemeColors()
    const dispatch = useDispatch();
    const [image, setImage] = useState<string | undefined>(post?.image)
    const [text, setText] = useState<string |undefined>(post?.text)
    const date = new Date()
    
    const addPost = (post : PostType) => {
        if(text){
            post.text = text
        }
        if(image){
            post.image = image
        }
        addPostData(post).then(() => getDatas().then((datas)=> dispatch(setDatas(datas))))
       
    }
    return (
        
    <Modal 
        animationType="fade"
        transparent
        visible={visible}
        >
        
            <Pressable style={styles.backdrop} onPress={() => setVisible(false)}/>
            <Pressable onPress={() => Keyboard.dismiss()} style={[styles.popup, {backgroundColor: colors.background, borderWidth:0.5, borderColor:colors.primary}]}>
                    <ThemedText style={styles.title} variant="subtitle2" color="primary">{post ? "Modify Post" : "New Post"}</ThemedText>
                    <Card style={styles.card}>
                        <TextInput value={text} onChangeText={newText => setText(newText)} multiline={true} numberOfLines={5} placeholderTextColor={colors.primary} placeholder="What's up ?" style={[styles.input, {borderColor:colors.primary, color: colors.primary}]}></TextInput>
                        <ImagePicker image={image ? image : null} addImage={setImage}/>
                        <Row style={{flex:1, justifyContent:'flex-end'}}>
                            <Pressable 
                                onPress={() => {
                                    addPost(
                                    {
                                        userId: 1,
                                        date: date.toDateString(),
                                    
                                    })
                                    setVisible(false)
                                }}
                                style={[styles.button,
                                  (image || text) ? {backgroundColor:colors.primary,borderColor:colors.primary}:
                                  {borderColor:colors.light}
                                  
                                  ]}
                                  disabled={(image || text) ? false : true}>
                                <ThemedText style={(image || text) ? {color:colors.background} : {color:colors.light}} variant="button">Post</ThemedText>
                            </Pressable>
                        </Row>
                    </Card>
                </Pressable>
        </Modal>

)}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        filter: 'blur(100)',
        
    },
    popup: {
        flex: 1,
        padding: 4,
        paddingTop: 16,
        gap: 20,
        borderRadius: 12,
        position: 'absolute',
        width:'90%',
        left:'50%',
        transform: 'translate(-50%,40%)',
    },
    title: {
        paddingLeft: 20
    },
    card: {
        paddingVertical:16,
        paddingHorizontal: 20,
        gap: 16
    },
    input: {
    
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        borderRadius:12,
        borderWidth:0.5,
        height:150,
        textAlignVertical:'top'
    },
    button: {
        borderRadius:36,
        borderWidth:0.5,
        paddingHorizontal:25,
        paddingVertical:8
    },
  

})