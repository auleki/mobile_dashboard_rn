import { StyleSheet, Text, View } from "react-native";

export default function RewardsOverTimeChart() {
    return (
        <View style={styles.container}>
            <Text>Rewards Over Time</Text>
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
