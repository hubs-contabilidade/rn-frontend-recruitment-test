import { View } from "react-native";
import { Image } from "expo-image";
import { styles } from "./styles";

export default function LoadingState() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/gif/load-rick-and-morty.gif")}
        style={styles.gif}
        contentFit="contain"
      />
    </View>
  );
}
