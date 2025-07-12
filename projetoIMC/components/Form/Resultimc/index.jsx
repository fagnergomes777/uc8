import { Text, Animated } from "react-native";
import styles from "./style";
import { useRef, useEffect } from "react";

export default function ResultImc(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (
      props.messageResultImc &&
      props.messageResultImc !== "Preencha o peso e altura" &&
      props.resultImc
    ) {
      fadeAnim.setValue(0);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }

  }, [props.messageResultImc, props.resultIMC, fadeAnim]);

  return(
    <Animated.View style={{opacity: fadeAnim}}>
        <Text style={styles.textResult}>{props.messageResultImc}</Text>
        <Text style={styles.textImcResult}>{props.resultIMC}</Text>
    </Animated.View>
  )

}
