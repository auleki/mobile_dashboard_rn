import { StyleSheet, Text, View } from "react-native";

export default function StakeTimeDistributionChart() {
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 600 }}>Stake Time Distribution Chart</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#ddd",
        borderRadius: 13,
        justifyContent: 'center'
    },
})
