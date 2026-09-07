/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, createTRPCRouter } from "../../create-context";
import { db } from "../../../db/connection";
import { designCustomizations } from "../../../db/drizzle-schema";
import { eq, and, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

// Input schemas
const saveCustomizationSchema = z.object({
  pagePath: z.string(),
  pageName: z.string(),
  prompt: z.string().min(1).max(1000),
  changes: z.object({
    layout: z.object({
      type: z.enum(["default", "compact", "spacious", "grid", "list"]).optional(),
      padding: z.number().optional(),
      gap: z.number().optional(),
    }).optional(),
    colors: z.object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      background: z.string().optional(),
      cardBackground: z.string().optional(),
      text: z.string().optional(),
      accent: z.string().optional(),
      headerBg: z.string().optional(),
      sidebarBg: z.string().optional(),
    }).optional(),
    widgets: z.object({
      hidden: z.array(z.string()).optional(),
      reordered: z.array(z.string()).optional(),
      added: z.array(z.string()).optional(),
      sizing: z.record(z.enum(["small", "medium", "large", "full"])).optional(),
    }).optional(),
    typography: z.object({
      fontSize: z.number().optional(),
      fontFamily: z.string().optional(),
      headingSize: z.number().optional(),
      lineHeight: z.number().optional(),
    }).optional(),
    visibility: z.object({
      showStats: z.boolean().optional(),
      showCharts: z.boolean().optional(),
      showSidebar: z.boolean().optional(),
      showHeader: z.boolean().optional(),
      showQuickActions: z.boolean().optional(),
    }).optional(),
    customCSS: z.record(z.string()).optional(),
  }),
});

const getCustomizationsSchema = z.object({
  pagePath: z.string().optional(),
});

const deleteCustomizationSchema = z.object({
  id: z.string(),
});

// AI prompt processing endpoint
const processDesignPromptSchema = z.object({
  prompt: z.string().min(1).max(1000),
  pagePath: z.string(),
  pageName: z.string(),
});

export const designAgentRouter = createTRPCRouter({
  // Save a design customization
  save: protectedProcedure
    .input(saveCustomizationSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      const [customization] = await db
        .insert(designCustomizations)
        .values({
          userId,
          pagePath: input.pagePath,
          pageName: input.pageName,
          prompt: input.prompt,
          changes: input.changes,
          appliedAt: new Date().toISOString(),
        })
        .returning();

      return customization;
    }),

  // Get all customizations for the current user
  getAll: protectedProcedure
    .input(getCustomizationsSchema.optional())
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      const query = db
        .select()
        .from(designCustomizations)
        .where(eq(designCustomizations.userId, userId))
        .orderBy(desc(designCustomizations.createdAt));

      if (input?.pagePath) {
        query.where(eq(designCustomizations.pagePath, input.pagePath));
      }

      return await query;
    }),

  // Get the latest customization for a specific page
  getForPage: protectedProcedure
    .input(z.object({ pagePath: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      const [customization] = await db
        .select()
        .from(designCustomizations)
        .where(
          and(
            eq(designCustomizations.userId, userId),
            eq(designCustomizations.pagePath, input.pagePath)
          )
        )
        .orderBy(desc(designCustomizations.createdAt))
        .limit(1);

      return customization || null;
    }),

  // Delete a customization
  delete: protectedProcedure
    .input(deleteCustomizationSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      const [existing] = await db
        .select()
        .from(designCustomizations)
        .where(
          and(
            eq(designCustomizations.id, input.id),
            eq(designCustomizations.userId, userId)
          )
        )
        .limit(1);

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Customization not found",
        });
      }

      await db
        .delete(designCustomizations)
        .where(
          and(
            eq(designCustomizations.id, input.id),
            eq(designCustomizations.userId, userId)
          )
        );

      return { success: true };
    }),

  // Delete all customizations for a page
  deleteForPage: protectedProcedure
    .input(z.object({ pagePath: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      await db
        .delete(designCustomizations)
        .where(
          and(
            eq(designCustomizations.userId, userId),
            eq(designCustomizations.pagePath, input.pagePath)
          )
        );

      return { success: true };
    }),

  // AI-powered design prompt processing
  processPrompt: protectedProcedure
    .input(processDesignPromptSchema)
    .mutation(async ({ ctx, input }) => {
      const { prompt, pagePath, pageName } = input;
      const lower = prompt.toLowerCase();

      // Parse the natural language prompt into structured design changes
      const changes: Record<string, any> = {};

      // Layout detection
      if (lower.includes("compact") || lower.includes("tight") || lower.includes("dense")) {
        changes.layout = { type: "compact", padding: 8, gap: 4 };
      } else if (lower.includes("spacious") || lower.includes("airy") || lower.includes("wide")) {
        changes.layout = { type: "spacious", padding: 24, gap: 16 };
      } else if (lower.includes("grid")) {
        changes.layout = { type: "grid" };
      } else if (lower.includes("list")) {
        changes.layout = { type: "list" };
      }

      // Color scheme detection
      const colorMap: Record<string, { primary: string; secondary: string; accent: string }> = {
        blue: { primary: "#007AFF", secondary: "#5AC8FA", accent: "#0A84FF" },
        dark: { primary: "#0A84FF", secondary: "#636366", accent: "#5E5CE6" },
        green: { primary: "#34C759", secondary: "#30D158", accent: "#32D74B" },
        red: { primary: "#FF3B30", secondary: "#FF453A", accent: "#FF375F" },
        purple: { primary: "#AF52DE", secondary: "#BF5AF2", accent: "#5E5CE6" },
        orange: { primary: "#FF9500", secondary: "#FF9F0A", accent: "#FF6482" },
        yellow: { primary: "#FFCC02", secondary: "#FFD60A", accent: "#FF9F0A" },
        teal: { primary: "#5AC8FA", secondary: "#64D2FF", accent: "#0A84FF" },
        pink: { primary: "#FF2D92", secondary: "#FF375F", accent: "#FF6482" },
        indigo: { primary: "#5856D6", secondary: "#5E5CE6", accent: "#3634A3" },
      };

      const singleColors = ["blue", "dark", "green", "red", "purple", "orange", "yellow", "teal", "pink", "indigo"];
      for (const color of singleColors) {
        if (lower.includes(color)) {
          const palette = colorMap[color];
          changes.colors = {
            ...changes.colors,
            primary: palette.primary,
            secondary: palette.secondary,
            accent: palette.accent,
          };

          if (lower.includes("light") || lower.includes("white")) {
            changes.colors.background = "#FFFFFF";
            changes.colors.text = "#000000";
            changes.colors.cardBackground = "#F2F2F7";
          } else if (lower.includes("dark") || color === "dark") {
            changes.colors.background = "#000000";
            changes.colors.text = "#FFFFFF";
            changes.colors.cardBackground = "#1C1C1E";
          }
          break;
        }
      }

      // Minimal/clean detection
      if (lower.includes("minimal") || lower.includes("simple") || lower.includes("clean")) {
        changes.visibility = {
          showStats: lower.includes("stats") ? true : false,
          showCharts: lower.includes("chart") ? true : false,
          showSidebar: lower.includes("sidebar") ? true : false,
        };
        changes.layout = { ...changes.layout, padding: 16, gap: 8 };
      }

      // Professional/corporate
      if (lower.includes("professional") || lower.includes("corporate")) {
        changes.colors = {
          ...changes.colors,
          primary: "#007AFF",
          secondary: "#5856D6",
          text: "#1C1C1E",
          background: "#FFFFFF",
          cardBackground: "#F8F8FA",
        };
        changes.typography = {
          fontSize: 14,
          headingSize: 20,
          lineHeight: 1.5,
        };
      }

      // Modern
      if (lower.includes("modern")) {
        changes.colors = {
          ...changes.colors,
          primary: "#0A84FF",
          accent: "#5E5CE6",
        };
        changes.layout = { ...changes.layout, gap: 12, padding: 20 };
      }

      // Widget visibility
      if (lower.includes("hide") || lower.includes("remove")) {
        changes.widgets = { hidden: [] };
        const hideTargets = ["stats", "chart", "graph", "sidebar", "header", "menu", "card", "widget", "table", "list"];
        for (const target of hideTargets) {
          if (lower.includes(`hide ${target}`) || lower.includes(`remove ${target}`) || (lower.includes("hide") && lower.includes(target))) {
            changes.widgets.hidden!.push(target);
          }
        }
      }

      // Typography
      if (lower.includes("larger text") || lower.includes("bigger font")) {
        changes.typography = { ...changes.typography, fontSize: 16, headingSize: 24 };
      } else if (lower.includes("smaller text") || lower.includes("smaller font")) {
        changes.typography = { ...changes.typography, fontSize: 12, headingSize: 18 };
      }

      // Add chart/widget
      if (lower.includes("add chart") || lower.includes("add graph") || lower.includes("add visualization")) {
        changes.widgets = {
          ...changes.widgets,
          added: [...(changes.widgets?.added || []), "data-chart"],
        };
      }

      if (lower.includes("add revenue") || lower.includes("revenue chart") || lower.includes("revenue graph")) {
        changes.widgets = {
          ...changes.widgets,
          added: [...(changes.widgets?.added || []), "revenue-chart"],
        };
      }

      // Save the customization to the database
      const userId = ctx.user.id;
      const [customization] = await db
        .insert(designCustomizations)
        .values({
          userId,
          pagePath,
          pageName,
          prompt,
          changes,
        })
        .returning();

      return customization;
    }),
});