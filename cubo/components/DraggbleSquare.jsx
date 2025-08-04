import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";

export default function DraggbleSquare() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const backgroundColor = useSharedValue("#3498db");

  //Gesto de Arrastar (Pan)

  const panGesture = Gesture.Pan()

    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })

    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    })

    .onEnd(() => {
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);
    });

  //fim do gesto Pan

  //Gesto de toque(tap)

  const tapGesture = Gesture.Tap().onEnd(() => {
    backgroundColor.value =
      backgroundColor.value === "#3498db" ? "#e74c3c" : "#3498db";
  });

  //fim do gesto Tap

  // Inicio gesto de pinça(zoom)

  const pinchGesture = Gesture.Pinch().onUpdate((event) => {
    scale.value = interpolate(event.scale, [0.5, 3], [0.5, 3]);
  });

  const composedGesture = Gesture.Simultaneous(
    Gesture.Exclusive(panGesture, tapGesture),
    pinchGesture
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    backgroundColor: backgroundColor.value,
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.square, animatedStyle]} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
