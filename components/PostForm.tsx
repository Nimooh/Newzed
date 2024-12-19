import { Pressable,   Modal, View, StyleSheet, TextInput } from "react-native"
import { ThemedText } from "./ThemedText"
import { Card } from "./Card"
import { useThemeColors } from "@/hooks/useThemeColors"
import { Post } from "@/constants/PostType"
import ImagePicker from "./ImagePicker"
import { useState } from "react"

type Props = {
    visible: boolean
    setVisible: (v : boolean) => {}
    post?:Post
}

export function PostForm ({visible, setVisible ,post}: Props ){
    const colors = useThemeColors()
    const [image, setImage] = useState<string | undefined>(post?.imgUri)
    const [text, setText] = useState<string |undefined>(post?.text)

    console.log("Image : ",image)
    console.log("Text : ",text)

    return (
        
    <Modal 
        animationType="fade"
        transparent
        visible={visible}
        >
        
            <Pressable style={styles.backdrop} onPress={() => setVisible(false)}/>
            <View style={[styles.popup, {backgroundColor: colors.background, borderWidth:0.5, borderColor:colors.primary}]}>
                    <ThemedText style={styles.title} variant="subtitle2" color="primary">{post ? "Modify Post" : "New Post"}</ThemedText>
                    <Card style={styles.card}>
                        <TextInput value={text} onChangeText={newText => setText(newText)} multiline={true} numberOfLines={5} placeholderTextColor={colors.primary} placeholder="What's up ?" style={[styles.input, {borderColor:colors.primary, color: colors.primary}]}></TextInput>
                        <ImagePicker image={image ? image : null} addImage={setImage}/>
                    </Card>
                </View>
        </Modal>

)}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        filter: 'blur(10)',
        
    },
    popup: {
        flex: 1,
        padding: 4,
        paddingTop: 16,
        gap: 16,
        borderRadius: 12,
        position: 'absolute',
        width:'90%',
        left:'50%',
        transform: 'translate(-50%,50%)',
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
    }

})