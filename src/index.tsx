import { makeDecorator } from "@storybook/preview-api";
import {
  getDefaultStore
} from "jotai";
export const ADDON_ID = "storybook/jotai-addon";
export const withJotai = makeDecorator({
  name: "withJotai",
  parameterName: "jotai",
  skipIfNoParametersOrOptions: false, // Needs to be false so values get cleared
  wrapper: (storyFn, context, { parameters }) => {
    if (!parameters) {
      console.error("no jotai parameters");
      return storyFn(context);
    }

    const store = getDefaultStore();

    Object.values(parameters).forEach(([atom, value]) => {
      store.set(atom, value);
    });

    return storyFn(context);
  },
});
export default withJotai;
