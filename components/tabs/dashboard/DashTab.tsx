import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get('window')

export function DashTab({ title, onClick, id, pathname, isActive }: { isActive: boolean, pathname: string, id: number, title: string, onClick: (id: number) => void }) {
    return (
        <View style={[styles.tab, { backgroundColor: isActive ? '#ddd' : 'transparent' }]}>
            <Text style={{ color: isActive ? '#333' : '#1a1a1a' }} onPress={() => onClick(id)}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: '#1a1a1a',
        padding: 10,
        borderRadius: 12,
        width: width / 4,
        color: '#fff',
        fontFamily: 'Helvetica'
    }
})
