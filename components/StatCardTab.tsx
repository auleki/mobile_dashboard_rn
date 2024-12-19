import {StyleSheet, Text, View} from "react-native";
import {Colors} from "@/constants/Colors";

type Props = {
    title: string;
    value: number;
    suffix?: string;
}

export default function StatCardTab({title, value, suffix}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.statTitle}>{title}</Text>
            <View style={styles.valueContainer}>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.suffix}>{suffix}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'crimson'
        justifyContent: 'center'
    },
    statTitle: {
        width: '100%',
        color: '#ddd',
        textAlign: 'center'
        // backgroundColor: 'crimson'
    },
    statValue: {
        fontSize: 36,
        color: '#fff'
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 5
    },
    suffix: {
        color: Colors.dark.green,
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 5
    }
})