import { StyleSheet, View, Text } from "react-native";

type Props = {
    tabs: any[];
    changeActiveTab: (id: number) => void;
    activePieDataTab: {}
}

export default function ChartDataTabs(data: Props) {
    return (
        <View style={styles.dataTabs}>
            {data.tabs.map((dataTab: { id: number, title: string }, index) => (
                <Text
                    key={index}
                    onPress={() => data.changeActiveTab(dataTab.id)}
                    style={dataTab.id === data.activePieDataTab?.id ? styles.dataTabActive : styles.dataTab}>
                    {dataTab.title === 'total' ? 'All' : dataTab.title}
                </Text>
            ))}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    dataTabs: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    dataTab: {
        color: 'gray',
        borderStyle: 'solid',
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    dataTabActive: {
        color: 'green',
        borderStyle: 'solid',
        borderColor: 'green',
        borderBottomWidth: 1
    },

})
