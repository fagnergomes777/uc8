import {View, Text, Image, Pressable} from 'react-native'
import {Link} from 'expo-router'
import styles from '../styles/mainStyles'

export default function Home(){
  return(
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image style={styles.image} source={require('../assets/images/pokebola.jpg')}/>

            <Text style={styles.title}>Bem-vindo ao App de Pokemon</Text>

            <Text style={styles.description}>Veja todos os seus pokemons preferidos!</Text>

            <View style={styles.buttonView} >
          <Link href="/Contacts" >
            <Pressable style={styles.button}>
              <Text style={styles.textButton}>Ver lista de Pokemons</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}