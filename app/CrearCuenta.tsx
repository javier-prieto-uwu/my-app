import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"; // <-- esta línea es clave

export default function RootLayout() {
  return (  
    <ScrollView>

    <Text style={styles.Titutlo}>
        Crea tu cuenta:
    </Text>

    <Text style={styles.Titutlos}>
        Usuario:
    </Text>
    
    <TextInput placeholder="Nombre de usuario" style={styles.campos}/>
           
    <Text style={styles.Titutlos}>
        Correo:
    </Text>
    
    <TextInput placeholder="Correo Electronico" style={styles.campos}/>

     <Text style={styles.Titutlos}>
        Contraseña:
    </Text>
    
    <TextInput placeholder="Contraseña" style={styles.campos}/>
      

    <View style={styles.caja}>
        <Link href={'/CrearCuenta'} style={styles.Buton2}>Crear Cuenta</Link>
    </View>


    </ScrollView>
  );
}


const styles = StyleSheet.create({

    campos:{

        borderWidth: 0.5,
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    Titutlos:{
        textAlign:'center',
        margin: 4,
        fontSize: 20
    },
    Buton2:{
        backgroundColor: 'black',
        color:'white',
        padding:10,
        borderRadius: 10,
        width: 150,
        textAlign: 'center'
    },
    caja:{
        alignItems:'center',
        marginTop: 10,
    },
        Titutlo:{
        textAlign:'center',
        margin: 4,
        fontSize: 40
    },
})