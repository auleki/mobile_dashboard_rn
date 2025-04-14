import { StyleSheet, Text, View, ScrollView } from "react-native";
import PieChartKey from "@/components/charts/pie/PieChartKey";
import { PieDataType } from "@/types/charts";
import { PieChartKeysType } from "@/types/components";

export default function PieChartKeys({ pieData, onPress, excludedChartData, total }: PieChartKeysType) {
    // console.log({ pieData });

    return (
        <ScrollView style={styles.container}>
            {/*CHART KEYS*/}
            {pieData?.map((data, index) => (
                <PieChartKey
                    total={total}
                    isExcluded={excludedChartData.includes(data.id)}
                    id={data.id}
                    onPress={onPress}
                    range={data.keyValue}
                    value={data.value}
                    color={data.color}
                    key={index} />
            ))}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 250,
        width: '100%',
        gap: 10
    },
    chartKey: {
        height: 10,
        width: 20,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'white',
    },
    keyContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
})
