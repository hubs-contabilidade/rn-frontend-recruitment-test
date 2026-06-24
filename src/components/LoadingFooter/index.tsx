import { View } from "react-native";
import { Image } from "expo-image";
import { styles } from "./styles";

export default function LoadingFooter() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/gif/load.gif")}
        style={styles.gif}
      />
    </View>
  );
}
