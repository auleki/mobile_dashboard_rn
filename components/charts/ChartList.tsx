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
        gap: 25
    },
    chartContainer: {
        gap: 50
    }
})