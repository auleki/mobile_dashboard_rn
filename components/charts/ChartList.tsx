import {StyleSheet, Text, View} from 'react-native'
import Animated, {useAnimatedRef} from "react-native-reanimated";
import {useBottomTabOverflow} from "@/components/ui/TabBarBackground";
import PowerMultiplierDistributionChart from "@/components/charts/PowerMultiplierDistributionChart";
import StakeTimeDistributionChart from "@/components/charts/StakeTimeDistributionChart";
import MORHoldersChart from "@/components/charts/MORHoldersChart";
import BurnedLockedMOR from "@/components/charts/BurnedLockedMORChart";
import StakersOverTimePoolChart from "@/components/charts/StakeOverTimePoolChart";
import TotalCirculatingSupply from "@/components/charts/TotalCirculatingSupply";
import PriceVolume from "@/components/charts/PriceVolumeChart";
import TabbedStatCard from "@/components/TabbedStatCard";
import BarChartTrial from "@/components/charts/BarChartTrial";

export default function ChartList() {
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
                {/* <BarChartTrial /> */}
                {/*<StakersOverTimePoolChart />*/}
                {/*<PriceVolume />    */}
            </View>
            
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 25
    },
    chartContainer: {
        gap: 50
    }
})