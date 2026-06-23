import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type Status = "All" | "Alive" | "Dead" | "unknown";

interface StatusFilterProps {
  selected: Status;
  onSelect: (status: Status) => void;
}

const STATUSES: Status[] = ["All", "Alive", "Dead", "unknown"];

export default function StatusFilter({ selected, onSelect }: StatusFilterProps) {
  return (
    <View style={styles.container}>
      {STATUSES.map((status) => (
        <TouchableOpacity
          key={status}
          style={[styles.chip, selected === status && styles.chipSelected]}
          onPress={() => onSelect(status)}
        >
          <Text style={[styles.chipText, selected === status && styles.chipTextSelected]}>
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}


