import { useThemeColors } from "@/hooks/useThemeColors"
import { useRef, useState } from "react"
import { Pressable,  Image, View, StyleSheet } from "react-native"

import React from "react"
import { PostForm } from "./PostForm"

type Props = {

}

export function PostButton (){
    const buttonRef = useRef<View>(null)
    const colors = useThemeColors()
    const [form, setForm] = useState(false)
    return (
        <>
            <Pressable onPress={() => setForm(true)}>
                <View
                    ref={buttonRef}
                    style={styles.button}
                    >                    
                    <Image source={require('@/assets/images/add_post_icon.png')} style={styles.image}  resizeMode="contain"/>
                </View>
            </Pressable>
            {form && <PostForm visible={form} setVisible={setForm} />}
        </>
    )
}
const styles = StyleSheet.create({
    image: {
       height:50,
       width:50
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain'

    },
    
})