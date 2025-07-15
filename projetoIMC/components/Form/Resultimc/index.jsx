import { Text, Animated, Share, View, TouchableOpacity } from "react-native";
import styles from "./style";
import { useRef, useEffect } from "react";

export default function ResultIMC(props) {
  const onShare = async () => {
    const result = await Share.share({
      message: `Meu IMC hoje é: ${props.resultIMC}`,
    });
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (
      props.messageResultImc &&
      props.messageResultImc !== "Preencha o peso e altura" &&
      props.resultIMC
    ) {
      fadeAnim.setValue(0);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [props.messageResultImc, props.resultIMC, fadeAnim]);

  return (
    <>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.textResult}>{props.messageResultImc}</Text>
        <Text style={styles.textImcResult}>{props.resultIMC}</Text>
      </Animated.View>

      <View>
        {props.resultIMC != null ? (
          <TouchableOpacity onPress={onShare} style={styles.buttonShare}>
            <Text style={styles.textButtonShare}>Compartilhar</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </>
  );
}
