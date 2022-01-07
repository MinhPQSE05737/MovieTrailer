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
 } from 'react-native';
 
 export default function App () {
   const [text, onChangeText] = useState('');
   const [results, setResults] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const searchMovie = async () => {
     // console.log('keySearch');
     if(text === ''){
       console.log('111');
       alert('Please enter name!');
       return;
     }
     setIsLoading(true);
     const response = await fetch(`https://imdb-api.com/en/API/SearchMovie/k_987h2c0j/${text}`);
     const json = await response.json();
     if(json.results !== null){
       setResults(json.results);
       setIsLoading(false);
       console.log({results});
       return;
     }
     else {
       alert('Not found!');
       return;
     }
     
   }
 
   const watchTrailer = async (id) => {
     const response = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_987h2c0j/${id}`);
     const json = await response.json();
     if(json.videoUrl !== null){
       Linking.openURL(json.videoUrl);
     }
     else {
       alert('Can not open!');
       return;
     }
    
   }
 
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Search Movie And Watch Trailer</Text>
       <TextInput 
           style={styles.textInput} 
           placeholder='Search...'
           value={text}
           onChangeText={text => onChangeText(text)}
           onSubmitEditing={searchMovie}/>
            <ActivityIndicator animating={isLoading} size='large' />
         <ScrollView style={styles.results}>
            {results?.map(result => (
              <View key={result.id}  style={styles.result}>
               <TouchableOpacity onPress={() => watchTrailer(result.id)}>
                 <Image 
                       source={{ uri: result.image}}
                       style={styles.image}
                       resizeMode ='cover'
                   />
                   <Text style={styles.heading}>{result.title}</Text>
               </TouchableOpacity>
                
              </View>
            ))}
         </ScrollView>
        
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
   },
   textInput: {
     width: '100%',
     padding: 20,
     borderRadius: 8,
     fontSize: 20,
     fontWeight: '500',
     marginBottom: 30,
     borderWidth: 1,
     borderColor: 'white',
   },
   results: {
     flex: 1,
   },
   result: {
     flex: 1,
     width: '100%',
     marginBottom: 20,
   },
   heading: {
     color: 'white',
     fontSize: 18,
     padding: 20,
     backgroundColor: '#445565',
   },
   image: {
     width: '100%',
     height: 300,
   }
 });
 