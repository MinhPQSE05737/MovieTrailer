/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TextInput,
   useColorScheme,
   View,
   Image,
   TouchableOpacity,
   Linking,
   Alert,
   ActivityIndicator,
   FlatList,
   Modal,
 } from 'react-native';
 import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react/cjs/react.development';
import { dataMovie, APIKEY } from '../constants';
import Carousel from 'react-native-snap-carousel'; 
import { WebView } from 'react-native-webview';

 export default function Home () {
   const [isVisible, setIsVisible] = useState(false);
   const [linkVideo, setLinkVideo] = useState('');
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]);
   const [text, onChangeText] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const navigation = useNavigation();

   useEffect(() => {
    async function fetchMyAPI() {
      setIsLoading(true);
      let response = await fetch(`https://imdb-api.com/en/API/Top250Movies/${APIKEY}`)
      response = await response.json();
      console.log({response});
      setData(response.items.slice(0, 9));
      setIsLoading(false);
    }
    fetchMyAPI()
  }, []);

   const searchMovie = async () => {
     if(text === ''){
       alert('Please enter name!');
       return;
     }
     setIsLoading(true);
     const response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${APIKEY}/${text}`);
     const json = await response.json();
     if(json.results !== ''){
      setIsLoading(false);
       navigation.navigate('Result', {data: json.results});
       return;
     }
     else {
       alert('Not found!');
       return;
     }
   }

   const renderItem = ({item, index}) => {
     return (
      <View style={{
        borderRadius: 5, 
        backgroundColor: 'white',
        padding: 10,
        width: 280,
        height: 280,
        marginLeft: 40,
        marginRight: 40,}}>
        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <Image source={{uri: item.image}} 
              style={{ width: '100%',
              height: 200,
              resizeMode: 'cover'}}/>
            <Text style={{fontSize: 20, color:'black'}}>{item.title}</Text>
        </TouchableOpacity>
      </View>
     )   
   }

   const watchTrailer = async (id) => {
    const response = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/${APIKEY}/${id}`);
    const json = await response.json();
    if(json.videoUrl !== ''){
      setIsVisible(true);
      setLinkVideo(json.videoUrl);
    }
    else {
      alert('Can not open!');
      return;
    }
   
  }

  const renderItemTopMovies = ({item, index}) => {
    return(
            <View key={item.id}  style={styles.result}>
               <TouchableOpacity onPress={() => watchTrailer(item.id)}>
                 <Image 
                       source={{ uri: item.image}}
                       style={styles.image}
                       resizeMode ='cover'
                   />
               </TouchableOpacity>
              </View>
    )
  }
 
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Top Movies</Text>
       <TextInput 
           style={styles.textInput} 
           placeholder='Search...'
           value={text}
           onChangeText={text => onChangeText(text)}
           onSubmitEditing={searchMovie}/>
        { isLoading && <ActivityIndicator animating={isLoading} hidesWhenStopped size={50} color='red' />  }
        <ScrollView style={styles.results}>
        <View style={styles.titleCategories}>
          <Text style={styles.textCate}>
              Marvel
          </Text>
        </View>
        <View style={{ flexDirection:'row', justifyContent: 'center', height: 280, marginBottom: 15,}}>
                <Carousel
                  layout={"default"}
                  data={dataMovie}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={renderItem}
                  onSnapToItem = { index => setIndex({activeIndex:index}) } />
        </View>
        <View style={styles.titleCategories}>
          <Text style={styles.textCate}>
              Top IMDB Movies
          </Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItemTopMovies}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />
           
         </ScrollView>
      <Modal
        style={{
          
        }}
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{ 
          flex: 1,
          backgroundColor: 'orange',
          borderWidth: 1,
          borderColor: 'orange',
          height: 300  }}>
            <TouchableOpacity onPress={() => setIsVisible(false)} style={{ backgroundColor: 'grey'}} >
              <Text style={{ fontSize: 30, textAlign: 'right', right: 10, color: 'white' }}>Close Modal X</Text>
            </TouchableOpacity>
            <WebView
              javaScriptEnabled={true}
              style={{flex:1, borderColor:'red', borderWidth:2, height: 200, width:'100%', }}
              source={{
                uri: linkVideo
              }}
            />
            </View>
      </Modal>
     </View>
   )
 }
 
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#7475cf',
     alignItems: 'center',
     justifyContent: 'flex-start',
     paddingHorizontal: 20,
   },
   title: {
     color: '#FFF',
     fontSize: 30,
     paddingTop: 30,
     marginBottom: 30,
     fontWeight: '700',
   },
   textInput: {
     width: '100%',
     padding: 20,
     borderRadius: 8,
     fontSize: 20,
     fontWeight: '500',
      marginBottom: 10,
     borderWidth: 1,
     borderColor: 'white',
   },
   results: {
     flex: 2,
     width: '100%'
   },
   result: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 10,
   },
   heading: {
     color: 'white',
     fontSize: 18,
     padding: 20,
     backgroundColor: '#445565',
   },
   image: {
     width: '100%',
     height: 150,
   },
   titleCategories: {
     width: '100%',
     padding: 10,
     justifyContent: 'flex-start',
     alignItems: 'flex-start',
     backgroundColor: 'white',
     opacity: 0.6,
     marginBottom: 10,

   },
   textCate: {
     fontSize: 15,
     fontWeight: '500',
     color: 'black',
     justifyContent: 'flex-start',
   },
 });
 