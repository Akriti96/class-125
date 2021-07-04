import *as React from "react"
import { View, Button, Text, Platform } from "react-native"
import *as ImagePicker from "expo-image-picker"
import *as Permissions from "expo-permissions"

export default class Picker extends React.Component {
    constructor() {
        super()
        this.state = {
            image: null
        }
    }

    getPermission = async () => {
        if (Platform.OS !== "web") {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== "granted") {
                alert(" sorry, give permission to camera")
            }
        }
    }

    componentDidMount() {
        this.getPermission()
    }



    uploadImage=async(uri)=>{
        const Data= new FormData()
        var filename=uri.split("/")[uri.split("/").length-1]
        var type=`image/${uri.split('.')[uri.split('.').length - 1]}`
      //console.log(type)

        const fileupload={
            uri:uri,
            name:filename,
            type:type
        }
       Data.append("digit",fileupload)
       fetch("https://38bcab219616.ngrok.io/predit-digit",{
           body:Data,
           method:"POST",
           headers:{
               "content-type":"multipart/form-data"
           }
       })
      .then((response)=>response.json())

      .then((result)=>{
        console.log("Sucess:", result)
      })
      .catch((error)=>{
        console.error("Error :", error)
      })

      }


    pickImage = async () => {
        try {
            var result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [8, 10],
                allowsEditing: true,
                quality: 1
            })
            if (!result.cancelled) {
                this.setState({
                    image: result.data
                })

                console.log(result.uri)
                this.uploadImage(result.uri)
            }

        }

        catch (E) {
            console.log(E)
        }
    }




    render() {
        return (
            <View style={{alignItems:"center", marginTop:400}}>
                <Button title="Take a picture from Gallary" color="red" onPress={this.pickImage}/>
             
            </View>
        )
    }
}
