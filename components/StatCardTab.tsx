import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useState } from "react";

type Props = {
    title: string;
    value: number;
    suffix?: string;
    prefix?: string
}

export default function StatCardTab({ title, value, suffix, prefix }: Props) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <View style={styles.container}>
            <Text style={styles.statTitle}>{title}</Text>
            <View style={styles.valueContainer}>
                {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
                <Text style={styles.statValue}>{value}</Text>
                {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    prefix: {
        color: "green",
        fontSize: 32
    },
    statTitle: {
        width: '100%',
        color: '#333',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    statValue: {
        fontSize: 36,
        color: '#1a1a1a'
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 1
    },
    suffix: {
        color: 'green',
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 5
    }
})
