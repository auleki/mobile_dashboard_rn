import {Pressable, StyleSheet, Text, View} from "react-native";
import {thousandTextParser} from "@/utils/utils";

export default function PieChartKey({range = '100-200', color, onPress, id, isExcluded = false, value}: {
    range: string,
    color: string,
    onPress: Function,
    id: number,
    isExcluded: boolean,
    value: number | string
}) {

    // console.log({range, id, value, color})

    if (value === 0) return null // only show keys that have values higher than 0

    return (
        <Pressable onPress={() => onPress(id)}>
            <View style={{...styles.keyContainer, backgroundColor: `${isExcluded ? '#000' : '#525252'}`}}>
                <Text 
                    style={{
                        ...styles.keyLabel, 
                        color: isExcluded ? '#1a1a1a' : '#fff',
                        textDecorationLine: `${isExcluded ? 'line-through': 'none'}`}}>
                    {thousandTextParser(range)}
                </Text>
                <View style={{backgroundColor: color, ...styles.chartKey}}/>
                <Text style={{
                    ...styles.keyValue,
                    color: isExcluded ? '#1a1a1a' : '#fff',
                    textDecorationLine: `${isExcluded ? 'line-through': 'none'}`
                }}>{value?.toLocaleString()}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    chartKey: {
        height: 10,
        width: 20,
        borderRadius: 3,
        color: "#fff"
    },
    keyContainer: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 5,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5,
    },
    keyLabel: {
        color: "#fff"
    },
    keyValue: {
        fontWeight: 'bold',
        color: "#fff"
    }
})