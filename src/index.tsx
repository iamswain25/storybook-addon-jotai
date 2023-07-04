import { addons, makeDecorator } from "@storybook/preview-api";
import { Atom, Provider, WritableAtom, createStore, useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { EVENTS } from "./constants";

type AtomHash = {
  [key: string]: Atom<unknown>;
};

const Wrapper = ({ atoms, children }: { atoms: AtomHash; children: any }) => {
  const channel = addons.getChannel();

  const useAtoms: AtomHash = {};
  Object.entries(atoms).forEach(([key, value]: [string, Atom<unknown>]) => {
    useAtoms[key] = useAtomValue(value) as any;
  });
  const atomValues = Object.values(atoms);

  useEffect(() => {
    channel.emit(EVENTS.ATOMS_CHANGED, useAtoms);
  }, [atoms, useAtoms, atomValues]);

  return children;
};

export const withJotai = makeDecorator({
  name: "withJotai",
  parameterName: "jotai",
  skipIfNoParametersOrOptions: false, // Needs to be false so values get cleared
  wrapper: (storyFn, context, { parameters }) => {
    const channel = addons.getChannel();

    if (!parameters) {
      channel.emit(EVENTS.RENDERED, { note: "withJotai decorator not used" });
      return storyFn(context);
    }

    const store = createStore();

    const { atoms, values } = parameters;

    Object.entries(atoms).map(
      ([key, atom]: [string, WritableAtom<unknown, [any], unknown>]) =>
        store.set(atom, values[key])
    );

    channel.emit(EVENTS.RENDERED, values);

    return (
      <Provider store={store}>
        <Wrapper atoms={atoms}>{storyFn(context)}</Wrapper>
      </Provider>
    );
  },
});
export default withJotai;
