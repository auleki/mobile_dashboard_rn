import {Text, View, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";

type Props = {
    labelText: string;
    labelValue: number;
}
export default function CenterLabel({labelValue = 0, labelText}: Props) {
    return (
        <View style={styles.centerLabel}>
            <Text style={styles.centerLabelText}>{labelText}</Text>
            <Text style={styles.centerLabelValue}>{labelValue.toLocaleString()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    centerLabel: {
        alignItems: 'center'
    },
    centerLabelText: {
        color: Colors.dark.icon,
        fontSize: 21,
        textAlign: 'center'
    },
    centerLabelValue: {
        color: '#fff',
        fontSize: 35,
        fontWeight: '800'
    },
})