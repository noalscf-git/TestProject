import React, {useContext, useRef, useState} from 'react';
import {Animated, Text, View, StyleSheet} from 'react-native'

export const MyContext = React.createContext({
    useAllert:(text:string) => {}
});

export const useMyAlert=()=>{
    const context = useContext(MyContext);
    return context.useAllert
}

let timerId: NodeJS.Timeout = null

const MyAlert: React.FC = (props) => {


    const [text, setText] = useState<string>('')
    const [openAlert, setOpenAlert] = useState<boolean>(false)

    const alertAnim = useRef(new Animated.Value(-50)).current;

    const alertOpen = (callback=null) => {
        setOpenAlert(true)
            Animated.timing(alertAnim, {
                toValue: 10,
                duration: 200,
                useNativeDriver: true
            }).start(callback);
    };

    const alertClose = (time=200,callback=null) => {
        setOpenAlert(false)
        Animated.timing(alertAnim, {
            toValue: -50,
            duration: time,
            useNativeDriver: true
        }).start(callback);
    };

    const useAllert = (text) => {
        clearTimeout(timerId)
        if(openAlert) {
            alertClose(50,()=>{
                setText(text)
                alertOpen()
                timerId = setTimeout(()=>{
                    alertClose()
                }, 5000)
            })
        }
        else {
            setText(text)
            alertOpen()
            timerId = setTimeout(()=>{
                alertClose()
            }, 5000)
        }
    }

    return (
        <MyContext.Provider value={{useAllert}}>
            <View style={styles.container}>

                {props.children}

                <Animated.View style={[styles.alert, {transform: [{ translateY: alertAnim }]}]}>
                    <Text>{text}</Text>
                </Animated.View>

            </View>

        </MyContext.Provider>

    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1, position:'absolute',top:0,left:0, right:0, bottom:0
    },
    alert:{
        width:'95%', flex:1, alignItems:'center', justifyContent:'center', alignSelf:'center',
                    borderRadius:25,
                    backgroundColor: "red", position:'absolute', zIndex:1, height: 50,
    }
  });

export default MyAlert

