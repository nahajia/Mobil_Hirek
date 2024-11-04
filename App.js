import { useState,useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  const [adatok,setAdatok]=useState([])
  const [selectedLanguage, setSelectedLanguage] = useState();

  const letoltes=async (nyelv)=>{
    const x=await fetch("https://newsapi.org/v2/top-headlines?country="+nyelv+"&apiKey=3896d67f06394c548239d21610ab6841")
    const y=await x.json()
    setAdatok(y.articles)
    //alert(JSON.stringify(y))
  }

  useEffect(()=>{
    letoltes("us")
  },[])

  const valtoztat=(nyelv)=>{
    setSelectedLanguage(nyelv)
    //alert(nyelv)
    letoltes(nyelv)
  }


  return (
    <View style={styles.container}>
      <Picker
              style={{backgroundColor:"white",color:"blue",margin:"auto",marginTop:10, marginBottom:10, width:200 }}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                valtoztat(itemValue)
              }>
              <Picker.Item label="Amerika" value="us" />
              <Picker.Item label="Magyar" value="hu" />
      </Picker>

    <FlatList
            data={adatok}
            renderItem={({item,index}) => 
              <View style={styles.keret}>
              <View style={styles.doboz}>
                <Image source={{uri:item.urlToImage}} style={{width:200,height:200}}/>
                <Text style={styles.cim}>{item.title}</Text>
                <Text style={styles.leiras}>{item.description}</Text>
                <Text style={styles.tartalom}>{item.content}</Text>

              
              </View>
              <Text style={styles.datum}>{item.publishedAt.split("T")[0]} {item.publishedAt.split("T")[1].split("Z")[0]}</Text>   
              <Text style={styles.forras}>{item.source.name}</Text>

              <TouchableOpacity 
                  style={styles.button} 
                  onPress={()=>Linking.openURL(item.url)}>
                      <Text style={{color:"white"}}>Olvass tovább</Text>
              </TouchableOpacity>

              </View>             
              }
              keyExtractor={(item, index) => index.toString()}
          />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000066',
    marginTop:50,


  },
  doboz:{
    alignItems:"center",

  },
  cim:{
        color:"white",
        textAlign:"center",
        fontWeight:"bold"
  },
  leiras:{
    color:"#b3b3ff",
    textAlign:"justify",
    margin:10
  },
  tartalom:{
    color:"#8080ff",
    textAlign:"justify",
    marginLeft:10 ,
    marginRight:10  
  },
  datum:{
    color:"#4545ff",
    marginLeft:15
  },
  forras:{
    color:"darkred",
    marginLeft:15
  },
  keret:{
    borderBottomColor:"blue",
    borderBottomWidth:2,
    marginBottom:20
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    marginBottom:10,
   
  },

});
