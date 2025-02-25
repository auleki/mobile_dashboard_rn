import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import PowerMultiplierDistributionChart from "@/components/charts/old/PowerMultiplierDistributionChart";
import StakeTimeDistributionChart from "@/components/charts/old/StakeTimeDistributionChart";
import MORHoldersChart from "@/components/charts/old/MORHoldersChart";
import BurnedLockedMOR from "@/components/charts/old/BurnedLockedMORChart";
import StakersOverTimePoolChart from "@/components/charts/old/StakeOverTimePoolChart";
import TotalCirculatingSupply from "@/components/charts/old/TotalCirculatingSupply";
import PriceVolume from "@/components/charts/old/PriceVolumeChart";
import TabbedStatCard from "@/components/TabbedStatCard";

export default function OldChartList() {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const bottom = useBottomTabOverflow();
    return (
        <Animated.ScrollView
            ref={scrollRef}
            style={styles.container}
            scrollEventThrottle={16}
            scrollIndicatorInsets={{ bottom }}
            contentContainerStyle={{ paddingBottom: bottom }}
        >
            {/*<Text style={{color: 'white'}}>ChartList</Text>*/}
            <View style={styles.chartContainer}>
                <TabbedStatCard />
                <MORHoldersChart />
                <StakeTimeDistributionChart />
                <PowerMultiplierDistributionChart />
                <BurnedLockedMOR />
                {/*<TotalCirculatingSupply />*/}
                {/*<StakersOverTimePoolChart />*/}
                {/*<PriceVolume />*/}
            </View>

        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 25,
        backgroundColor: "#1a1a1a"
    },
    chartContainer: {
        gap: 50,
        backgroundColor: "#1a1a1a"
    }
})
