import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import StatCardTab from "@/components/StatCardTab";
import StatCardTabHead from "@/components/StatCardTabHead";
import { useEffect, useState } from "react";
import { Skeleton } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { transformNumber } from "@/utils/utils";
import SkeletonLoader from "./ui/loaders/SkeletonLoader";

type Props = {
    stats: any[];
    isLoading: boolean;
}

const { width } = Dimensions.get('screen')

export default function TabbedStatCard({ stats, isLoading = true }: Props) {
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
                {activeTab && <StatCardTab title={activeTab?.title} value={transformNumber(activeTab?.value)} prefix={'$ '} />}
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
    },

})
