import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import StatCardTab from "@/components/StatCardTab";
import StatCardTabHead from "@/components/StatCardTabHead";
import { useEffect, useState } from "react";
import { STAT_CARD_DATA } from "@/utils/dataBank";
import SkeletonLoader from "./ui/loaders/SkeletonLoader";

type Props = {
    stats: any[];
    isLoading: boolean;
    prefix: string | boolean;
}

export default function TabbedStatCard({ prefix = '$ ', stats, isLoading = true }: Props) {
    const [activeTab, setActiveTab] = useState({})

    function switchTab(tab: {}) {
        setActiveTab(tab)
    }

    useEffect(() => {
        setActiveTab(stats[0])
    }, [stats]);

    if (isLoading) return (
        <SkeletonLoader />
    )

    function transformNumber(val: string) {
        const roundedUp = Number(val).toFixed(2)
        return Number(roundedUp).toLocaleString() // Add commas to the number
    }

    return (
        <View style={styles.container}>
            <View style={styles.tabHeads}>
                {stats.map((tab, index) =>
                    <Pressable
                        key={index}
                        onPress={() => switchTab(tab)}
                        style={{ paddingVertical: 5 }}
                    >
                        <StatCardTabHead
                            isActive={tab.title === activeTab?.title}
                            title={tab.title}
                            value={tab.value}
                            tabTitle={tab.tabTitle}
                        />
                    </Pressable>
                )}
            </View>
            <View style={styles.tabContent}>
                {/*{STAT_CARD_DATA.map((tab, index) => (*/}
                {/*    <StatCardTab title={tab.title} value={tab.value.toLocaleString()} suffix={'MOR'} key={index} />*/}
                {/*))}*/}
                {activeTab && <StatCardTab title={activeTab?.title} value={transformNumber(activeTab?.value)} prefix={prefix} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10,
        borderWidth: 2,
        borderRadius: 13,
        borderColor: "#ddd"
    },
    tabHeads: {
        flexDirection: 'row',
        justifyContent: "center",
        gap: 10,
        marginBottom: 20
    },
    tabContent: {
        flexDirection: 'column',
        justifyContent: "center",
        gap: 10,
    }
})
