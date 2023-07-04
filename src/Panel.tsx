import { AddonPanel } from "@storybook/components";
import { useChannel } from "@storybook/manager-api";
import React, { useState } from "react";
import { PanelContent } from "./components/PanelContent";
import { EVENTS } from "./constants";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [currentValues, setCurrentValues] = useState({});
  const [initialValues, setInitialValues] = useState({});

  const { RENDERED, ATOMS_CHANGED } = EVENTS;
  useChannel({
    [RENDERED]: (values) => {
      setInitialValues(values);
      setCurrentValues(values);
    },
    [ATOMS_CHANGED]: (values) => {
      setCurrentValues(values);
    },
  });

  return (
    <AddonPanel {...props}>
      <PanelContent
        currentValues={currentValues}
        initialValues={initialValues}
      />
    </AddonPanel>
  );
};
