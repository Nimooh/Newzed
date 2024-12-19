import { PostType } from '@/constants/PostType';
import * as FileSystem from 'expo-file-system';


const dataDir = FileSystem.documentDirectory + 'data/';
const dataFileUri = dataDir+'data.json'
const imgDir = dataDir + 'img/';
// Checks if Dir exists. If not, creates it
async function ensureDirExists() {
    const dataDirInfo = await FileSystem.getInfoAsync(dataDir);
    if (!dataDirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dataDir, { intermediates: true }).then(() => {
        FileSystem.writeAsStringAsync(dataFileUri, '[]')
        })
    }
    const imgDirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!imgDirInfo.exists) {
        console.log("img directory doesn't exist, creating…");
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
}

export async function getDatas() {
    await ensureDirExists();

    const fileInfo = await FileSystem.getInfoAsync(dataFileUri);
    const fileContent = await FileSystem.readAsStringAsync(fileInfo.uri) 
    return JSON.parse(fileContent);
}

export function generateUniqueId(datas : PostType[]) {
    let newId : number;
    do {
        newId = Math.floor(Math.random() * 1000000);
    } while (datas.some(post => post.id === newId));
    return newId;
}

export async function addPostData(post : PostType) {
    await ensureDirExists();
    const fileInfo = await FileSystem.getInfoAsync(dataFileUri);
    const fileContent = await FileSystem.readAsStringAsync(fileInfo.uri) 
    const datas = JSON.parse(fileContent);
    if(post.image) {
    post.image = getImageFileUri(post.image)
    }
    datas.push(post)
    saveDatas(datas)
}



export async function ModifyPost(id: number,post : PostType) {
    await ensureDirExists();
    const fileInfo = await FileSystem.getInfoAsync(dataFileUri);
    const fileContent = await FileSystem.readAsStringAsync(fileInfo.uri) 
    const datas = JSON.parse(fileContent);
    const index = datas.findIndex((x: { id: number; }) => x.id === id);
    if (index !== -1) {
        datas[index] = post; 
    } else {
        datas.push(post);
    }
    
    await saveDatas(datas);
}

export async function saveDatas(datas : []) {
    await ensureDirExists();
    await FileSystem.writeAsStringAsync(dataFileUri, JSON.stringify(datas))
}

function getImageFileUri(imageUrl: string) {
    return imgDir+imageUrl.slice(imageUrl.indexOf('ImagePicker/') + 'ImagePicker/'.length)
}

// Downloads a specified img
export async function addImg(imageUrl: string) {
    try {
        await ensureDirExists();
        await FileSystem.copyAsync({
            from: imageUrl,
            to: getImageFileUri(imageUrl),
        });
    } catch (e) {
        console.error("Couldn't download img files:", e);
        
    }
}


// Returns URI to our local img file
// If our img doesn't exist locally, it downloads it
export async function getSingleimg(imgUri: string) {
    await ensureDirExists();

    const fileInfo = await FileSystem.getInfoAsync(imgUri);

    if (!fileInfo.exists) {
        console.log("img isn't cached locally. Downloading…");
        
    }

    return imgUri;
}
export async function delSingleimg(imgUri: string) {
    await FileSystem.deleteAsync(imgUri);
}


// Deletes whole data directory with all its content
export async function deleteAll() {
    await FileSystem.deleteAsync(dataDir);
}
