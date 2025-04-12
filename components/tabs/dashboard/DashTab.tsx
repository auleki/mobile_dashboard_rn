import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Icon } from "@rneui/themed";

const { width } = Dimensions.get('window')

export function DashTab({ title, onClick, id, pathname, isActive, locked }: { locked: Boolean, isActive: boolean, pathname: string, id: number, title: string, onClick: (id: number) => void }) {
    return (
        <View style={[styles.tab, { backgroundColor: isActive ? '#ddd' : 'transparent' }]}>
            <Text
                style={{ color: isActive ? '#333' : '#1a1a1a' }}
                onPress={(!locked ? () => onClick(id) : () => {})}>
                {title}
            </Text>
            <Text>{locked ? <Icon name="lock" color={"green"} size={16} /> : null}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: '#1a1a1a',
        padding: 10,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 5,
        borderRadius: 12,
        width: width / 4,
        color: '#fff',
        fontFamily: 'Helvetica'
    }
})
