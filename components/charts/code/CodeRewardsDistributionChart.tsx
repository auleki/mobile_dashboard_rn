import SkeletonLoader from "@/components/ui/loaders/SkeletonLoader";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function CodeRewardsDistributionChart() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 4000)
    }, [])

    if (isLoading) return (
        <SkeletonLoader />
    )
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 21 }}>CodeRewardsDistributionChart</Text>
            <Text>Distribution of Total MOR Emissions</Text>
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
