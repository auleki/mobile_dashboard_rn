import { StyleSheet, View, Text } from "react-native";

export default function Footer() {
    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>Have any suggestions? Join the Discord here</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center'
    }
})
