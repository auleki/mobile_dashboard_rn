import { loadChartData } from "@/backend/services/charts";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

export default function DailyMOREmissions() {
    const [chartData, setChartData] = useState<{}[]>([])
    const [currentChartData, setCurrentChartData] = useState<{}[]>([])

    useEffect(() => {
        const getChartData = async () => {
            const data = await loadChartData('total_and_circ_supply')
            const processedData = data.data.map(item => ({
                date: item.date,
                dateObj: item.date,
                totalEmission: parseFloat(item.total_emission) || 0
            })).sort((a, b) => a.dateObj - b.dateObj);
            const slicedProcessedData = processedData.slice(0, 5)
            const _newChartData = Object.entries(slicedProcessedData)
                .map((data) => ({ x: data[1].date, y: data[1].totalEmission }))
            setCurrentChartData(_newChartData)
            return data
        }

        getChartData()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 600 }}>Daily MOR</Text>
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                    data={currentChartData}
                    x="x"
                    y="y"
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    style={{
                        data: { stroke: "#0D6733FF" },
                        parent: { border: "1px solid #1a1a1a" }
                    }}
                />
            </VictoryChart>
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
