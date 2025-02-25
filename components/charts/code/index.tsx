import { StyleSheet, View, Text } from "react-native";
import ContributorStats from "./ContributorStats";
import CodeRewardsDistributionChart from "./CodeRewardsDistributionChart";

export default function CodeCharts() {
    return (
        <View style={styles.container}>
            {/* <Text style={{ fontSize: 21 }}>Code Charts</Text> */}

            {/* Number of Active Code Contributors */}

            {/* Number of Active Code Contributors */}

            <ContributorStats />
            <CodeRewardsDistributionChart />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20
    }
})
