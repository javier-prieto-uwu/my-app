import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CalculadoraCostos() {
  // Estado único para todo el cálculo, listo para guardar en base de datos
  const [calculo, setCalculo] = useState({
    usuario: 'Motias wapo',
    filamento: {
      tipo: '',
      precioBobina: '',
      pesoBobina: '',
      gramosUtilizados: '40',
      costoFilamento: '12',
      costoMaterialSolo: '10',
    },
    manoObra: {
      preparacionTiempo: '',
      preparacionCosto: '',
      costoTotalManoObra: '12',
    },
    avanzados: {
      arosLlavero: '',
      imanes: '',
      otrosMateriales: '',
      consumoKwh: '',
      costoKwh: '',
      costoLuz: '0',
      horasimpresion:'0',
      totalMaterialesExtra: '0',
    },
    fecha: new Date().toISOString(),  
  });

  // definimos por defecto que el menu de mostrar avanzado se va a mentener apagado hasta que se llame la funcion
  const [mostrarAvanzado, setMostrarAvanzado] = useState(false);

  // Estado simulado de materiales guardados (luego vendrá de Firebase)
  const materialesGuardados = [
    { id: '1', nombre: 'PLA Negro 1kg', tipo: 'PLA', subtipo: 'Normal', precioBobina: '450', pesoBobina: '1000', color: '#222' },
    { id: '2', nombre: 'ABS Blanco 750g', tipo: 'ABS', subtipo: 'Plus', precioBobina: '500', pesoBobina: '750', color: '#fff' },
    { id: '3', nombre: 'PETG Azul 1kg', tipo: 'PETG', subtipo: 'Transparente', precioBobina: '520', pesoBobina: '1000', color: '#1e88e5' },
    { id: '4', nombre: 'TPU Flexible 500g', tipo: 'TPU', subtipo: 'Flexible', precioBobina: '600', pesoBobina: '500', color: '#43a047' },
    { id: '5', nombre: 'Nylon Carbono 1kg', tipo: 'Nylon', subtipo: 'Carbono', precioBobina: '800', pesoBobina: '1000', color: '#757575' },
    { id: '6', nombre: 'PC Normal 1kg', tipo: 'PC', subtipo: 'Normal', precioBobina: '900', pesoBobina: '1000', color: '#b0b0b0' },
    { id: '7', nombre: 'HIPS Normal 1kg', tipo: 'HIPS', subtipo: 'Normal', precioBobina: '400', pesoBobina: '1000', color: '#fbc02d' },
    { id: '8', nombre: 'ASA Normal 1kg', tipo: 'ASA', subtipo: 'Normal', precioBobina: '700', pesoBobina: '1000', color: '#fb8c00' },
    { id: '9', nombre: 'Wood Normal 500g', tipo: 'Wood', subtipo: 'Normal', precioBobina: '650', pesoBobina: '500', color: '#a1887f' },
    { id: '10', nombre: 'PLA Silk Oro 1kg', tipo: 'PLA', subtipo: 'Silk', precioBobina: '480', pesoBobina: '1000', color: '#ffd700' },
  ];
  const [verMasMateriales, setVerMasMateriales] = useState(false);

  // Estado para el material seleccionado
  const [materialSeleccionado, setMaterialSeleccionado] = useState('');

  const tiposFilamento = [
    'PLA',
    'ABS',
    'PETG',
    'TPU',
    'Nylon',
    'Resina',
    'HIPS',
    'PC (Policarbonato)',
    'Filamento Flexible',
    'Filamento con Madera'
  ];

  // Subtipos de filamento (igual que en agregarM)
  const subtiposFilamento = [
    { tipo: 'PLA', subtipos: ['Normal', 'Silk', 'Plus', 'Madera', 'Brillante', 'Mate', 'Flexible', 'Glow', 'Metal', 'Transparente', 'Multicolor', 'Reciclado', 'Carbono', 'Magnético', 'Conductivo', 'Alta temperatura', 'Baja temperatura'] },
    { tipo: 'ABS', subtipos: ['Normal', 'Plus', 'Reciclado', 'Transparente', 'Ignífugo', 'Carbono'] },
    { tipo: 'PETG', subtipos: ['Normal', 'Transparente', 'Reciclado', 'Carbono'] },
    { tipo: 'TPU', subtipos: ['85A', '95A', 'Flexible', 'Transparente'] },
    { tipo: 'Nylon', subtipos: ['Normal', 'Carbono', 'Vidrio'] },
    { tipo: 'PC', subtipos: ['Normal', 'Carbono'] },
    { tipo: 'HIPS', subtipos: ['Normal'] },
    { tipo: 'ASA', subtipos: ['Normal'] },
    { tipo: 'PVA', subtipos: ['Normal'] },
    { tipo: 'PP', subtipos: ['Normal'] },
    { tipo: 'Wood', subtipos: ['Normal'] },
    { tipo: 'Metal', subtipos: ['Normal'] },
    { tipo: 'Flexible', subtipos: ['Normal'] },
    { tipo: 'Conductivo', subtipos: ['Normal'] },
  ];

  // Handlers para actualizar el objeto de cálculo
  const handleFilamentoChange = (name, value) => {
    setCalculo(prev => ({
      ...prev,
      filamento: {
        ...prev.filamento,
        [name]: value
      }
    }));
  };

  const handleManoObraChange = (name, value) => {
    setCalculo(prev => ({
      ...prev,
      manoObra: {
        ...prev.manoObra,
        [name]: value
      }
    }));
  };

  const handleAvanzadoChange = (name, value) => {
    setCalculo(prev => ({
      ...prev,
      avanzados: {
        ...prev.avanzados,
        [name]: value
      }
    }));
  };

  // Handler para seleccionar material y rellenar campos
  const handleSeleccionMaterial = (id) => {
    setMaterialSeleccionado(id);
    const mat = materialesGuardados.find(m => m.id === id);
    if (mat) {
      setCalculo(prev => ({
        ...prev,
        filamento: {
          ...prev.filamento,
          tipo: mat.tipo,
          subtipo: mat.subtipo || '',
          precioBobina: mat.precioBobina,
          pesoBobina: mat.pesoBobina,
          color: mat.color || '',
        }
      }));
    }
  };

  // Cálculo de filamento
  const calcularCostoFilamento = () => {
    const { precioBobina, pesoBobina, gramosUtilizados } = calculo.filamento;
    if (precioBobina && pesoBobina && gramosUtilizados) {
      const costoPorGramo = parseFloat(precioBobina) / parseFloat(pesoBobina);
      const costo = costoPorGramo * parseFloat(gramosUtilizados);
      setCalculo(prev => ({
        ...prev,
        filamento: {
          ...prev.filamento,
          costoFilamento: costo.toFixed(2),
          costoMaterialSolo: costo.toFixed(2),
        }
      }));
    }
  };

  // Cálculo de mano de obra
  const calcularManoObra = () => {
    const horas = parseFloat(calculo.manoObra.preparacionTiempo) || 0;
    const costoPorHora = parseFloat(calculo.manoObra.preparacionCosto) || 0;
    const total = horas * costoPorHora;
    setCalculo(prev => ({
      ...prev,
      manoObra: {
        ...prev.manoObra,
        costoTotalManoObra: total.toFixed(2)
      }
    }));
  };

  // Cálculo de materiales extra y luz
  const calcularAvanzado = () => {
    const aros = parseFloat(calculo.avanzados.arosLlavero) || 0;
    const otros = parseFloat(calculo.avanzados.otrosMateriales) || 0;
    const kwh = parseFloat(calculo.avanzados.consumoKwh) || 0;
    const costoKwh = parseFloat(calculo.avanzados.costoKwh) || 0;
    const horasimpresion = parseFloat(calculo.avanzados.horasimpresion) || 0;
    const costoLuz = ((kwh / 1000) * costoKwh) * horasimpresion;
    const totalMaterialesExtra = aros + otros;
    setCalculo(prev => ({
      ...prev,
      avanzados: {
        ...prev.avanzados,
        costoLuz: costoLuz.toFixed(2),
        totalMaterialesExtra: totalMaterialesExtra.toFixed(2),
      }
    }));
  };

  // Cálculo total
  const getTotal = () => {
    const filamento = parseFloat(calculo.filamento.costoFilamento) || 0;
    const manoObra = parseFloat(calculo.manoObra.costoTotalManoObra) || 0;
    let total = filamento + manoObra;
    if (mostrarAvanzado) {
      const extra = parseFloat(calculo.avanzados.totalMaterialesExtra) || 0;
      const luz = parseFloat(calculo.avanzados.costoLuz) || 0;
      total += extra + luz;
    }
    return total.toFixed(2);
  };

  // Simulación de guardado en base de datos
  const guardarEnBaseDeDatos = () => {
    // Aquí solo mostramos el objeto, pero en el futuro puedes hacer un setDoc/addDoc de Firebase
    Alert.alert('Cálculo guardado', JSON.stringify(calculo, null, 2));
  };

  const getProduccion = () => {
    const filamento = parseFloat(calculo.filamento.costoMaterialSolo) || 0;
    const manoObra = parseFloat(calculo.manoObra.costoTotalManoObra) || 0;
    const extra = parseFloat(calculo.avanzados.totalMaterialesExtra) || 0;
    const luz = parseFloat(calculo.avanzados.costoLuz) || 0;
    return (filamento + manoObra + extra + luz).toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>

      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.username}>{calculo.usuario}</Text>
      </View>

      {/* Sección de Filamento */}
      <View style={styles.section}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>

          {/* cuadro general de calculo de filamento */}
          <Text style={styles.sectionTitle}>CÁLCULO DE FILAMENTO</Text>

          {/* Boton de opciones avanzadas al ser pulsado se activa la funcion de mostrar avanzado*/}
          <TouchableOpacity
          // al precionarse pone el valor contrario del de precionar avanzado.
            style={styles.advancedToggleBtn} onPress={() => setMostrarAvanzado(!mostrarAvanzado)}>
            <Text style={styles.advancedToggleText}>{mostrarAvanzado ? 'Ocultar' : 'Avanzado'}</Text>
          </TouchableOpacity>


        </View>
        <Text style={styles.label}>Seleccionar material guardado</Text>

        {/* Selector de material guardado como pastillas en 2 columnas */}
        <View style={{ flexDirection: 'column', flexWrap: 'wrap', marginBottom: 8 }}>
          {(() => {
            const mats = verMasMateriales ? materialesGuardados : materialesGuardados.slice(0, 5);
            const filas = [];
            for (let i = 0; i < mats.length; i += 2) {
              filas.push(mats.slice(i, i + 2));
            }
            return filas.map((fila, idx) => (
              <View key={idx} style={{ flexDirection: 'row', marginBottom: 4, justifyContent: 'center', alignSelf: 'center', maxWidth: 340, width: '100%' }}>
                {fila.map((mat) => (
                  <TouchableOpacity
                    key={mat.id}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: materialSeleccionado === mat.id ? '#00e676' : '#222',
                      borderColor: materialSeleccionado === mat.id ? '#00e676' : '#333',
                      borderWidth: 2,
                      borderRadius: 16,
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      marginHorizontal: 4,
                      minHeight: 40,
                      maxWidth: '48%',
                    }}
                    onPress={() => handleSeleccionMaterial(mat.id)}
                  >
                    <View style={{
                      width: 14,
                      height: 14,
                      borderRadius: 7,
                      backgroundColor: mat.color,
                      borderWidth: 1,
                      borderColor: '#333',
                      marginRight: 6,
                    }} />
                    <View style={{ flexShrink: 1 }}>
                      <Text style={{
                        color: materialSeleccionado === mat.id ? '#222' : '#fff',
                        fontWeight: materialSeleccionado === mat.id ? 'bold' : 'normal',
                        fontSize: 12,
                        flexWrap: 'wrap',
                      }} numberOfLines={1} ellipsizeMode="tail">{mat.nombre}</Text>
                      <Text style={{ color: '#a0a0a0', fontSize: 10 }} numberOfLines={1} ellipsizeMode="tail">{mat.subtipo}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
                {fila.length === 1 && <View style={{ flex: 1 }} />} {/* Espacio para alinear si es impar */}
              </View>
            ));
          })()}
          {!verMasMateriales && materialesGuardados.length > 5 && (
            <TouchableOpacity
              style={{
                backgroundColor: '#181818',
                borderColor: '#00e676',
                borderWidth: 2,
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 14,
                marginRight: 8,
                marginBottom: 8,
                marginTop: 16,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onPress={() => setVerMasMateriales(true)}
            >
              <Text style={{ color: '#00e676', fontWeight: 'bold', fontSize: 14 }}>Ver más...</Text>
            </TouchableOpacity>
          )}
          {verMasMateriales && materialesGuardados.length > 5 && (
            <TouchableOpacity
              style={{
                backgroundColor: '#181818',
                borderColor: '#e53935',
                borderWidth: 2,
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 14,
                marginRight: 8,
                marginBottom: 8,
                marginTop: 16,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onPress={() => setVerMasMateriales(false)}
            >
              <Text style={{ color: '#e53935', fontWeight: 'bold', fontSize: 14 }}>Ver menos...</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Selector de subtipo de filamento */}
        {calculo.filamento.tipo && (
          <>
            <Text style={styles.label}>Subtipo de filamento</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={calculo.filamento.subtipo}
                onValueChange={(itemValue) => handleFilamentoChange('subtipo', itemValue)}
                style={styles.picker}
                dropdownIconColor="#00e676"
              >
                <Picker.Item label="Seleccionar subtipo..." value="" />
                {(subtiposFilamento.find(t => t.tipo === calculo.filamento.tipo)?.subtipos || []).map((sub, idx) => (
                  <Picker.Item key={idx} label={sub} value={sub} />
                ))}
              </Picker>
            </View>
          </>
        )}

        <Text style={styles.label}>Tipo de filamento</Text>

        {/* Selector de filamento */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={calculo.filamento.tipo}
            onValueChange={(itemValue) => handleFilamentoChange('tipo', itemValue)}
            style={styles.picker}
            dropdownIconColor="#00e676"
          >
            <Picker.Item label="Seleccionar tipo..." value="" />
            {tiposFilamento.map((tipo, index) => (
              <Picker.Item key={index} label={tipo} value={tipo} />
            ))}
          </Picker>
        </View>

        
        <Text style={styles.label}>Precio de la bobina (MXN)</Text>
        <TextInput
          style={styles.input}
          value={calculo.filamento.precioBobina}
          onChangeText={(text) => handleFilamentoChange('precioBobina', text)}
          onBlur={calcularCostoFilamento}
          placeholder="Ej: 450.00"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Peso de la bobina (gramos)</Text>
        <TextInput
          style={styles.input}
          value={calculo.filamento.pesoBobina}
          onChangeText={(text) => handleFilamentoChange('pesoBobina', text)}
          onBlur={calcularCostoFilamento}
          placeholder="Ej: 1000"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Gramos utilizados</Text>
        <TextInput
          style={styles.input}
          value={calculo.filamento.gramosUtilizados}
          onChangeText={(text) => handleFilamentoChange('gramosUtilizados', text)}
          onBlur={calcularCostoFilamento}
          placeholder="Ej: 40"
          keyboardType="numeric"
        />
        
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Costo total del filamento:</Text>
          <Text style={styles.resultValue}>${calculo.filamento.costoFilamento} MXN</Text>
          <Text style={styles.detailText}>Para {calculo.filamento.gramosUtilizados}g utilizados</Text>
        </View>
      </View>

      {/* Opciones avanzadas */}
      {mostrarAvanzado && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>COSTOS AVANZADOS</Text>
          <Text style={styles.label}>Otros materiales (MXN)</Text>
          <TextInput
            style={styles.input}
            value={calculo.avanzados.otrosMateriales}
            onChangeText={(text) => handleAvanzadoChange('otrosMateriales', text)}
            placeholder="Ej: 2.00"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Consumo de luz (kWh)</Text>
          <TextInput
            style={styles.input}
            value={calculo.avanzados.consumoKwh}
            onChangeText={(text) => handleAvanzadoChange('consumoKwh', text)}
            placeholder="Ej: 0.5"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Costo por kWh (MXN)</Text>
          <TextInput
            style={styles.input}
            value={calculo.avanzados.costoKwh}
            onChangeText={(text) => handleAvanzadoChange('costoKwh', text)}
            placeholder="Ej: 2.5"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Horas de impresion (horas)</Text>
          <TextInput
            style={styles.input}
            value={calculo.avanzados.horasimpresion}
            onChangeText={(text) => handleAvanzadoChange('horasimpresion', text)}
            placeholder="Ej: 60"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.saveButton} onPress={calcularAvanzado}>
            <Text style={styles.saveButtonText}>Calcular avanzados</Text>
          </TouchableOpacity>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Total materiales extra: <Text style={styles.costoBasico}>${calculo.avanzados.totalMaterialesExtra} MXN</Text></Text>
            <Text style={styles.resultLabel}>Costo de luz: <Text style={styles.costoBasico}>${calculo.avanzados.costoLuz} MXN</Text></Text>
          </View>
        </View>
      )}

      {/* Sección de Mano de Obra */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CÁLCULO DE MANO DE OBRA</Text>
        <Text style={styles.subsectionTitle}>Preparación de la impresión</Text>
        <Text style={styles.label}>Tiempo (horas)</Text>
        <TextInput
          style={styles.input}
          value={calculo.manoObra.preparacionTiempo}
          onChangeText={(text) => handleManoObraChange('preparacionTiempo', text)}
          placeholder="Ej: 2"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Coste por hora (MXN)</Text>
        <TextInput
          style={styles.input}
          value={calculo.manoObra.preparacionCosto}
          onChangeText={(text) => handleManoObraChange('preparacionCosto', text)}
          placeholder="Ej: 150.00"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.saveButton} onPress={calcularManoObra}>
          <Text style={styles.saveButtonText}>Calcular mano de obra</Text>
        </TouchableOpacity>
      </View>

      {/* Resumen total de costos */}
      <View style={[styles.section, styles.totalSection]}>
        <Text style={styles.sectionTitle}>RESUMEN DE COSTOS</Text>
        <View style={{marginBottom: 8}}>
          <Text style={styles.resumenLabel}>Materiales: <Text style={styles.costoBasico}>${calculo.filamento.costoMaterialSolo} MXN</Text></Text>
          <Text style={styles.resumenLabel}>Mano de obra: <Text style={styles.costoBasico}>${calculo.manoObra.costoTotalManoObra} MXN</Text></Text>
          <Text style={styles.resumenLabel}>Materiales extra: <Text style={styles.costoBasico}>${calculo.avanzados.totalMaterialesExtra} MXN</Text></Text>
          <Text style={styles.resumenLabel}>Luz: <Text style={styles.costoBasico}>${calculo.avanzados.costoLuz} MXN</Text></Text>
        </View>
        <Text style={styles.resumenLabel}>Costo de producción: <Text style={styles.costoProduccion}>${getProduccion()} MXN</Text></Text>
        <Text style={styles.resumenLabel}>Costo total: <Text style={styles.costoVenta}>${getTotal()} MXN</Text></Text>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={guardarEnBaseDeDatos}>
        <Text style={styles.saveButtonText}>GUARDAR CÁLCULO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 20,
  },
  header: {
    marginBottom: 20,
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
  section: {
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    color: '#00e676',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subsectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#181818',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 4,
  },
  pickerContainer: {
    backgroundColor: '#181818',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 5,
    overflow: 'hidden',
  },
  picker: {
    color: 'white',
    height: 50,
  },
  resultContainer: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  resultLabel: {
    color: '#a0a0a0',
    fontSize: 14,
    marginBottom: 4,
  },
  resultValue: {
    color: '#00e676',
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  totalSection: {
    borderColor: '#00e676',
    borderWidth: 1,
  },
  totalLabel: {
    color: '#00e676',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  totalValue: {
    color: '#00e676',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#00e676',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resumenLabel: {
    color: '#a0a0a0',
    fontSize: 15,
    marginBottom: 2,
  },
  resumenValue: {
    color: 'white',
    fontWeight: 'bold',
  },
  costoProduccion: {
    color: '#2196f3', // azul
    fontWeight: 'bold',
    fontSize: 18,
  },
  costoVenta: {
    color: '#00e676', // verde
    fontWeight: 'bold',
    fontSize: 18,
  },
  advancedToggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#222',
    marginLeft: 8,
  },
  advancedToggleText: {
    color: '#00e676',
    fontSize: 13,
    fontWeight: 'bold',
  },
  costoBasico: {
    color: '#e53935', // rojo
    fontWeight: 'bold',
  },
});