import *as React from "react"
import {View,Button,Text,Platform} from "react-native"
// import PickImage from "./screens/cm"
import Picker from "./screens/camera"
export default class App extends  React.Component{
    render(){
        return(
            <View>
           <Picker/>
            </View>
        )
    }
}