import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import {millisToMinutesAndSeconds} from './utils/index';
import {Audio} from 'expo-av';
import Icon from '@expo/vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';

export default function App() {
  const [playToPermisson, setPlayToPermission] = useState(null);
  const [isPlayer, setIsPlayer] = useState(null);
  const [isSoundToAlready,  setisSoundToAlready] = useState(null);
  const [playToMusic, setPlayToMusic] = useState(new Audio.Sound());
  const [statusPlayer, setStatusPlayer] = useState(false);
  const [secondsPlayer, setSecondsPlayer] = useState(null);
  const [animated, setAnimetade] = useState(0);
  const [durationAnimeted, setAnimationDirutaion] = useState(0);

 
  useEffect(() => {
    async function permissionToAudio() {
      await Audio.requestPermissionsAsync()
    }
    permissionToAudio();
    async function getPermissionToAudio() {
      await Audio.getPermissionsAsync()
    
    }
    getPermissionToAudio();
  },[])
  



  playMusic = async () => {
    try {
      setStatusPlayer(true)
  
      await  playToMusic.loadAsync(require('./abc.mp3')
      ).then((b) =>{
        setAnimationDirutaion(b.durationMillis), setisSoundToAlready(false)
      }).catch(err => setisSoundToAlready(true));
      
       const a = await playToMusic.setOnPlaybackStatusUpdate(status => {
         setSecondsPlayer(millisToMinutesAndSeconds(status.positionMillis))

         setAnimetade(status.positionMillis);
        } );
    
      
     if(isSoundToAlready) {
      await playToMusic.pauseAsync();;
   
       
      
     }
    await playToMusic.playAsync();


    
      
     
       
         

      
    
      

       setIsPlayer(true);
    

      
  
     
     } 
      
     
      // await playToMusic.setOnPlaybackStatusUpdate(status => console.log(status));
      // Your sound is playing!
     catch (error) {
      console.log(error.message);
      
      // An error occurred!
    }
  }
 
  pause = async () => {
  
    const a =  await playToMusic.playFromPositionAsync();
    const {isPlaying} = a;
    if(isPlaying) {
   
      await playToMusic.pauseAsync();
      setStatusPlayer(!statusPlayer)
     
       setIsPlayer(false)
     
    } else {
      return;
    }

      

    

  }
  

 
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: "center", width: 150, height: 50, borderRadius:100, backgroundColor: '#FAFEFF', elevation: 1}}>
      {statusPlayer ? (
       <View style={{flexDirection: 'row', justifyContent:'space-around', alignItems: "center", marginLeft: 5}}>
          <TouchableOpacity onPress={() => pause()}>
        <Icon name="pause" size={22} color="#333">

        </Icon>
         
      </TouchableOpacity>
      <View>
      <Progress.Bar progress={ animated ?  animated / durationAnimeted : 0} 
      width={100} 
      height={5}
      style={{marginTop: 12, marginLeft: 5}}
      color="#333" 
    
      animationType="spring"
      />
      <View style={{flexDirection: 'row', alignItems: "center", marginLeft: 5}}>
        <Icon name="access-time" size={10} color="#333"/>
      <Text style={{fontSize: 10}}>{secondsPlayer ? secondsPlayer : "0:00"}</Text>
      </View>
      </View>
       </View>
     
      ) : (
        <View style={{alignItems: 'center', flexDirection: 'row', marginLeft: 5 }}>
       <TouchableOpacity onPress={() => playMusic()}>
        <Icon name="play-arrow" size={22} color="#333">

        </Icon>
      </TouchableOpacity>
      <View>
      <Progress.Bar progress={ animated ?  animated / durationAnimeted : 0} 
      width={100} 
      height={5}
      style={{marginTop: 12, marginLeft: 5}}
      color="#333" 
     
      animationType="spring"
      />
      <View style={{flexDirection: 'row', alignItems: "center", marginLeft: 5}}>
        <Icon name="access-time" size={10} color="#333"/>
      <Text style={{fontSize: 10}}>{secondsPlayer ? secondsPlayer : "0:00"}</Text>
      </View>
      </View>
    
     </View>
       
        
      )}
       
      </View>
     
       
      
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
});
