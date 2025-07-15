import {
  View,
  Text,
  TextInput,
  Pressable,
  Animated,
  Vibration,
  Keyboard,
} from "react-native";
import styles from "./style";
import { useState, useRef, useEffect } from "react";
import ResultIMC from "./Resultimc";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(null);

  //inicio da animação
  const slideAnim = useRef(new Animated.Value(100)).current; //slide para cima

  const fadeAnim = useRef(new Animated.Value(0)).current; // começa invisivel

  //executa animação
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, fadeAnim]);

  //Função calcular IMC
  function imcCalculator() {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    return (weightNum / (heightNum * heightNum)).toFixed(2);
  }

  //Função de Verificar campos vazios

  function vericationImc() {
    if (imc === null) {
      Vibration.vibrate(1000);
      setErrorMessage("Campo obrigatório*");
      return;
    }
  }

  // Função de validação
  function validationImc() {
    Keyboard.dismiss();

    if (weight != null && height != null) {
      const calculatedImc = imcCalculator();
      setImc(calculatedImc);
      setHeight(null);
      setWeight(null);
      setMessageImc("Seu IMC é igual:");
      setTextButton("Calcular Novamente");
      setErrorMessage(null);
      return;
    }
    vericationImc();
    setImc(null);
    setTextButton("Calcular IMC");
    setMessageImc("Preencha o peso e altura");
  }

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <Animated.View
        style={[
          styles.formContainer,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim,
              },
            ],
          },
        ]}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Altura (m)</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setHeight}
            value={height}
            placeholder="Ex. 1.75"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Peso (kg)</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setWeight}
            value={weight}
            placeholder="Ex. 80"
            keyboardType="numeric"
          />

          <Pressable
            style={styles.buttonCalculator}
            onPress={() => validationImc()}
          >
            <Text style={styles.buttonCalculatorText}>{textButton}</Text>
          </Pressable>
        </View>
        <ResultIMC messageResultImc={messageImc} resultIMC={imc} />
      </Animated.View>
    </Pressable>
  );
}
