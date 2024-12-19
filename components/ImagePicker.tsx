import {   View, StyleSheet, Pressable, Image } from 'react-native';
import * as IP from 'expo-image-picker';
import { useEffect } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
    image: string | null
    addImage: Function
}

export default function ImagePicker( {image, addImage}: Props ) {
 const colors = useThemeColors()
  const pickImage = async () => {
    let result = await IP.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
        addImage(result.assets[0].uri);
    }
  };
  return (
    <View>
      <Pressable onPress={pickImage} style={[styles.button, {borderColor: colors.primary}]}>
        {image ? <Image source={{uri : image}} style={styles.image}/> :
        <Image source={require('@/assets/images/image_picker.png')} style={styles.icon}/>
}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
   flex:1,
   width:'75%',
   alignSelf:'center',
   alignItems: 'center',
   justifyContent: 'center',
   resizeMode: 'contain',
   paddingHorizontal:15,
   paddingVertical:15,
   borderWidth:0.5,
   borderStyle:'dashed',
   borderRadius: 10,
   height:165
  },
  image: {
    height:150,
    aspectRatio:4/3
  },
  icon: {
    height:50,
    aspectRatio:1.7
  }

});
