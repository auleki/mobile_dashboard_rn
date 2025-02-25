import { StyleSheet, View, Text } from "react-native";

export default function CapitalRewardsDistributionChart() {
    return (
        <View style={styles.container}>
            <Text>Capital Rewards Chart</Text>
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
