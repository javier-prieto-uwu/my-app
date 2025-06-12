import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// Datos de prueba en formato JSON
const materialesmap = [
  {
    id: 1,
    name: "Filamentos",
    price: 220.98,
    stock: 10,
    description: "Laptop Acer aspire 5",
    imageUrl: "https://www.mexicomakers.com.mx/cdn/shop/files/PLABlack.jpg?v=1740682017"
  },
  {
    id: 2,
    name: "Aros Llavero",
    price: 160.98,
    stock: 10,
    description: "Game CCD",
    imageUrl: "https://www.mexicomakers.com.mx/cdn/shop/files/PLABlack.jpg?v=1740682017"
  },
  {
    id: 3,
    name: "Pegamentos",
    price: 120.98,
    stock: 10,
    description: "Subscription Netflix",
    imageUrl: "https://www.mexicomakers.com.mx/cdn/shop/files/PLABlack.jpg?v=1740682017"
  },
  {
    id: 4,
    name: "Pines",
    price: 20.98,
    stock: 10,
    description: "Gofood",
    imageUrl: "https://www.mexicomakers.com.mx/cdn/shop/files/PLABlack.jpg?v=1740682017"
  },
  {
    id: 5,
    name: "Resina UV",
    price: 720.98,
    stock: 10,
    description: "Plaza Mall",
    imageUrl: "https://www.mexicomakers.com.mx/cdn/shop/files/PLABlack.jpg?v=1740682017"
  },
  {
    id: 6,
    name: "Pinturas",
    price: 520.98,
    stock: 10,
    description: "Jogja, Indonesia",
    imageUrl: "https://www.mexicomakers.com.mx/cdn/shop/files/PLABlack.jpg?v=1740682017"
  }
];

export default function Home() {
  return (
    <ScrollView style={styles.contenedorP}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.username}>Mattas wapo</Text>
      </View>

      Última cotización
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteLabel}>Ultima Cotización</Text>
        <View style={styles.quoteAmountContainer}>
          {/* <Text style={styles.quoteAmount}>$50.49</Text>
          <Text style={styles.currency}>MXN</Text> */}
        </View>
      </View>

      {/* Lista de materiales */}
      <View style={styles.materialsContainer}>
        <Text style={styles.sectionTitle}>Materiales disponibles</Text>

        {materialesmap.map((material) => (
          <View key={material.id} style={styles.materialItem}>
            {/* Contenedor de imagen */}
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: material.imageUrl }} 
                style={styles.materialImage}
                resizeMode="cover"
              />
            </View>
            
            {/* Contenedor de información */}
            <View style={styles.infoContainer}>
              <View style={styles.materialInfo}>
                <Text style={styles.materialName}>{material.name}</Text>
                <Text style={styles.materialPrice}>${material.price.toFixed(2)}</Text>
              </View>
              <View style={styles.materialDetails}>
                <Text style={styles.materialStock}>{material.stock} objetos disponibles</Text>
                <Text style={styles.materialDescription}>{material.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedorP: {
    backgroundColor: 'black',
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '300',
  },
  username: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  quoteContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  quoteLabel: {
    color: '#a0a0a0',
    fontSize: 16,
    marginBottom: 8,
  },
  quoteAmountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  quoteAmount: {
    color: '#00e676',
    fontSize: 32,
    fontWeight: 'bold',
  },
  currency: {
    color: '#a0a0a0',
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  materialsContainer: {
    marginBottom: 24,
  },
  materialItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 12,
  },
  materialImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  materialInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  materialName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  materialPrice: {
    color: '#00e676',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  materialDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  materialStock: {
    color: '#a0a0a0',
    fontSize: 12,
    flex: 1,
  },
  materialDescription: {
    color: '#a0a0a0',
    fontSize: 12,
    fontStyle: 'italic',
    marginLeft: 8,
    textAlign: 'right',
  },
});