import { StyleSheet, View, Text } from "react-native";
import CapitalRewardsDistributionChart from "./CapitalRewardsDistributionChart";
import TotalCurrentCapitalCharts from "./TotalCurrentCapitalChart";

export default function CapitalCharts() {
    return (
        <View style={styles.container}>
            {/* <Text style={{ fontSize: 21 }}>Capital Charts</Text> */}
            <TotalCurrentCapitalCharts />
            <CapitalRewardsDistributionChart />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20
    }
})
