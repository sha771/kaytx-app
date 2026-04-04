import { z } from "zod";
import { protectedProcedure } from "../../../create-context";
import { bridgeRegistry } from "./registry";
import type { BridgeCapability } from "./types";

export const listBridgesProcedure = protectedProcedure.query(async () => {
  const drivers = bridgeRegistry.list();
  return drivers.map((d) => ({
    id: d.id,
    name: d.name,
    protocol: d.protocol,
    supportsTLS: Boolean(d.tls?.enabled),
  }));
});

export const bridgeStatusProcedure = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }: { input: { id: string } }) => {
    const driver = bridgeRegistry.get(input.id);
    if (!driver) {
      throw new Error("Bridge not found");
    }
    return bridgeRegistry.getState(input.id);
  });

export const connectBridgeProcedure = protectedProcedure
  .input(
    z.object({ id: z.string(), config: z.record(z.string(), z.unknown()).default({}) }),
  )
  .mutation(async ({ input }: { input: { id: string; config: Record<string, unknown> } }) => {
    const driver = bridgeRegistry.get(input.id);
    if (!driver) throw new Error("Bridge not found");
    const state = await driver.connect(input.config);
    bridgeRegistry.setState(input.id, state);
    return state;
  });

export const disconnectBridgeProcedure = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }: { input: { id: string } }) => {
    const driver = bridgeRegistry.get(input.id);
    if (!driver) throw new Error("Bridge not found");
    const state = await driver.disconnect();
    bridgeRegistry.setState(input.id, state);
    return state;
  });

export const sendTestBridgeProcedure = protectedProcedure
  .input(z.object({ id: z.string(), payload: z.record(z.string(), z.unknown()).optional() }))
  .mutation(async ({ input }: { input: { id: string; payload?: Record<string, unknown> } }) => {
    const driver = bridgeRegistry.get(input.id);
    if (!driver || !driver.sendTest) throw new Error("Bridge not found or unsupported");
    return driver.sendTest(input.payload);
  });
