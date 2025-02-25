import { View, StyleSheet, Text } from "react-native";

type Props = {
    title: string;
    value: number;
    tabTitle: string;
    isActive: boolean;
}

export default function StatCardTabHead({ tabTitle, isActive }: Props) {
    return (
        <View>
            <Text style={[
                styles.tabTitle,
                {
                    color: isActive ? 'green' : 'gray',
                    borderColor: isActive ? 'green' : 'transparent'
                }]}>
                {tabTitle}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tabTitle: {
        width: '100%',
        paddingVertical: 2,
        borderBottomWidth: 1,
        textTransform: 'capitalize',
    }
})
