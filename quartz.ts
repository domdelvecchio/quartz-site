import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// Explorer: folders first; date-named files (YYYY-MM-DD ...) newest first; everything else A-Z.
// Raw transcripts are embedded in their meeting pages, so their folder is hidden from the menu.
ExternalPlugin.Explorer({
  filterFn: (node) => !(node.isFolder && node.slugSegment === "transcripts") && node.slugSegment !== "tags",
  sortFn: (a, b) => {
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
    const da = /^\d{4}-\d{2}-\d{2}/.test(a.displayName)
    const db = /^\d{4}-\d{2}-\d{2}/.test(b.displayName)
    if (da && db) return b.displayName.localeCompare(a.displayName, undefined, { numeric: true })
    return a.displayName.localeCompare(b.displayName, undefined, { numeric: true, sensitivity: "base" })
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
