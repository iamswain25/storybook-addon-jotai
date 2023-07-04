import { addons, types } from "@storybook/manager-api";
import { Panel } from "./Panel";
import { PANEL_ID } from "./constants";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the panel
addons.add(PANEL_ID, {
  type: types.PANEL,
  title: "My addon",
  match: ({ viewMode }) => viewMode === "story",
  render: Panel,
});
