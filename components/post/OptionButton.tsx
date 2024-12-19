import React from "react"
import { useRef, useState } from "react"
import { Dimensions, Modal, Pressable, View,Image, StyleSheet } from "react-native"
import { Card } from "../Card"
import { ThemedText } from "../ThemedText"
import { useThemeColors } from "@/hooks/useThemeColors"
import { PostForm } from "./PostForm"
import { PostType } from "@/constants/PostType"
import { deletePost, getDatas } from "@/functions/fs"
import { setDatas } from "@/store/reducers/dataSlice"
import { useDispatch } from "react-redux"

type Props = {
    post : PostType
}

export function OptionButton({post}: Props) {
    const colors = useThemeColors()
    const dispatch = useDispatch();
    const buttonRef = useRef<View>(null)
    const [modifForm, setModifForm] = useState(false)
    const [isModalVisible, setModalVisibility] = useState(false)
    const removePost = (post : PostType) => {
            deletePost(post).then(() => getDatas().then((datas)=>  {
                dispatch(setDatas(datas))
            }))
        }
    const [position, setPosition] = useState<null | {
        top: number,
         right: number
        }>(null)
    const onButtonPress = () => {
        buttonRef.current?.measureInWindow((x,y, width, height) => {
            if(Dimensions.get("window").height-(y +height+150)<0) {
                setPosition({
                    top: y - (height*2.5),
                    right: Dimensions.get("window").width - x - width/2
                })
            }
            else {
            setPosition({
                top: y + height,
                right: Dimensions.get("window").width - x - width/2
            })
        }
        })
        setModalVisibility(true)
    }
    const onClose = () => {
        setModalVisibility(false)
    }
    return ( 
        <>
            <Pressable onPress={onButtonPress}>
                <View
                    ref={buttonRef}
                    style={[styles.button]}
                    >
                    <Image source={require('@/assets/images/options.png')} style={styles.icon}/>
                </View>
            </Pressable>
            <Modal 
            animationType="fade"
            transparent
            visible={isModalVisible}>
                <Pressable style={styles.backdrop} onPress={onClose}>
                    <View style={[styles.popup, {backgroundColor: colors.background, borderColor: colors.primary, borderWidth: 0.5}, {...position}]}>
                        <Card style={styles.card}>
                            
                            <Pressable onPress={() =>{
                                setModifForm(true)
                                onClose
                                }
                            }>
                                <ThemedText variant="button" style={{color: colors.modify}}>Modify</ThemedText>
                            </Pressable>
                            <Pressable onPress={() => {
                                removePost(post)
                                onClose
                            }
                            }>
                                <ThemedText variant="button" style={{color: colors.remove}}>Delete</ThemedText>
                            </Pressable>
                        </Card>
                    </View>
                </Pressable>
            </Modal>
            {
                modifForm && <PostForm post={post} visible={modifForm} setVisible={setModifForm}/>
            }
        </>
)}

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)"
    },
    popup: {
        padding: 4,
        gap: 16,
        borderRadius: 12,
        position: 'absolute',
        width: 113,
    },

    card: {
        flex:1,
        paddingVertical:16,
        paddingHorizontal: 20,
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height:30,
        width:30
    },

})

function dispatch(arg0: any): any {
    throw new Error("Function not implemented.")
}
