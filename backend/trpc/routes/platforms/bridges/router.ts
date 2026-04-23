import { z } from "zod";
import { permissionProcedure } from "../../../create-context";
import { bridgeRegistry } from "./registry";
import { Permission } from "../../../../lib/rbac";

export const listBridgesProcedure = permissionProcedure(Permission.BRIDGE_READ)
  .input(z.object({}).optional())
  .query(async ({ input }) => {
  const drivers = bridgeRegistry.list();
  return drivers.map((d) => ({
    id: d.id,
    name: d.name,
    protocol: d.protocol,
    supportsTLS: Boolean(d.tls?.enabled),
  }));
});

export const bridgeStatusProcedure = permissionProcedure(Permission.BRIDGE_STATUS_READ)
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    const driver = bridgeRegistry.get(input.id);
    if (!driver) {
      throw new Error("Bridge not found");
    }
    return bridgeRegistry.getState(input.id);
  });

export const connectBridgeProcedure = permissionProcedure(Permission.BRIDGE_CONNECT)
  .input(
    z.object({ id: z.string(), config: z.record(z.string(), z.unknown()).default({}) }),
  )
  .mutation(async ({ input }) => {
    const driver = bridgeRegistry.get(input.id);
    if (!driver) throw new Error("Bridge not found");
    const state = await driver.connect(input.config);
    bridgeRegistry.setState(input.id, state);
    return state;
  });

export const disconnectBridgeProcedure = permissionProcedure(Permission.BRIDGE_DISCONNECT)
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }) => {
    const driver = bridgeRegistry.get(input.id);
    if (!driver) throw new Error("Bridge not found");
    const state = await driver.disconnect();
    bridgeRegistry.setState(input.id, state);
    return state;
  });

export const sendTestBridgeProcedure = permissionProcedure(Permission.BRIDGE_CONNECT)
  .input(z.object({ id: z.string(), payload: z.record(z.string(), z.unknown()).optional() }))
  .mutation(async ({ input, ctx }) => {
    const driver = bridgeRegistry.get(input.id);
    if (!driver || !driver.sendTest) throw new Error("Bridge not found or unsupported");
    return driver.sendTest(input.payload ?? {});
  });
