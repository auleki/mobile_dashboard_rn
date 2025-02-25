import { StatTabType } from "@/types/hooks"
import { useState } from "react"

const useTabbedStats = (stats:StatTabType) => {
    const [statTabs, setStatTabs] = useState<{}[]>([])

    // console.log({"STAT_TABS": statTabs});

    return {
        statTabs
    }
}

export default useTabbedStats
