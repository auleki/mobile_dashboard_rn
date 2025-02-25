import { StyleSheet, Text, View } from "react-native";
import PowerMultiplierDistributionChart from "./PowerMultiplierDistributionChart";
import RewardsOverTimeChart from "./RewardsOverTimeChart";
import StakeTimeDistributionChart from "./StakeTimeDistributionChart";


export default function StakingCharts() {
    return (
        <View style={styles.container}>
            {/* <Text style={{ fontSize: 21 }}>Staking Charts</Text> */}

            {/* Staking Stats */}
            {/* This would be like a stack of stack boxes */}

            {/* <RewardsOverTimeChart /> */}
            {/* <StakeTimeDistributionChart /> */}
            <PowerMultiplierDistributionChart />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20
    }
})
