import { StyleSheet, View, Text } from "react-native";

export default function ContributorStats() {
    return (
        <View style={styles.container}>
            <Text>Contributor Stats(Active / Total Contributors)</Text>
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
