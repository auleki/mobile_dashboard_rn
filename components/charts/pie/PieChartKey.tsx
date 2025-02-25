import { Pressable, StyleSheet, Text, View } from "react-native";
import { calculatePercentage, thousandTextParser } from "@/utils/utils";

export default function PieChartKey({ range = '100-200', color, onPress, id, isExcluded = false, value, total }: {
    range: string,
    color: string,
    onPress: Function,
    id: number,
    isExcluded: boolean,
    value: number | string,
    total: number
}) {

    // console.log({range, id, value, color})


    if (value === 0) return null // only show keys that have values higher than 0

    return (
        <Pressable onPress={() => onPress(id)}>
            <View style={{ ...styles.keyContainer, backgroundColor: `${isExcluded ? '#000' : '#ddd'}` }}>
                <View style={{ backgroundColor: color, ...styles.chartKey, alignSelf: 'center' }} />

                <View style={styles.labelContainer}>
                    <Text
                        style={{
                            ...styles.keyLabel,
                            color: isExcluded ? '#1a1a1a' : '#333',
                            textDecorationLine: `${isExcluded ? 'line-through' : 'none'}`
                        }}>
                        {thousandTextParser(range)}<Text style={{ fontSize: 10, color: "#767676FF" }}>(MOR)</Text>
                    </Text>
                </View>


                <Text style={{
                    ...styles.keyValue,
                    color: isExcluded ? '#1a1a1a' : '#1a1a1a',
                    textDecorationLine: `${isExcluded ? 'line-through' : 'none'}`
                }}>
                    {value?.toLocaleString()} <Text style={{ fontSize: 14, fontWeight: '400', color: "#767676FF" }}>({calculatePercentage(Number(value), Number(total))}%)</Text><Text style={{ fontSize: 10, fontWeight: '400', color: "#767676FF" }}>Holders</Text>
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    chartKey: {
        height: 10,
        width: 20,
        borderRadius: 3,
        color: "#fff",
        alignItems: 'center'
    },
    labelContainer: {
        // label container styles
    },
    keyContainer: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        width: 300,
        flex: 3,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5,
    },
    keyLabel: {
        color: "#fff",

    },
    keyValue: {
        fontWeight: 'bold',
        color: "#fff"
    }
})
