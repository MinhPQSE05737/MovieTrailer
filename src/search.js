/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect, useState} from 'react';
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
 import { useNavigation } from '@react-navigation/native';
 import { APIKEY } from '../constants';
 
 export default function Result (props) {
console.log('props', props);
    const {route} = props;

   const [text, onChangeText] = useState('');
   const [results, setResults] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const navigation = useNavigation();
   useEffect(() => {
    // Update the document title using the browser API
        setResults(route?.params.data);
  }, []);
 
   const watchTrailer = async (id) => {
    setIsLoading(true);
     const response = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/${APIKEY}/${id}`);
     const json = await response.json();
     console.log('json', json);
     if(json.videoUrl !== ''){
      setIsLoading(false);
       Linking.openURL(json.videoUrl);
     }
     else {
      console.log('2222');
      setIsLoading(false);
       alert('Can not open!');
       return;
     }
    
   }
 
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Result</Text>
       { isLoading && <ActivityIndicator animating={isLoading} hidesWhenStopped size={50} color='red' />  }
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
     paddingHorizontal: 20,
     justifyContent: 'flex-start',
   },
   title: {
    color: '#FFF',
    fontSize: 30,
    marginBottom: 30,
    fontWeight: '700',
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
 