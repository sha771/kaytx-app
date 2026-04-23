declare module 'drizzle-orm' {
  export function and(...conditions: any[]): any;
  export function eq(column: any, value: any): any;
  export function ne(column: any, value: any): any;
  export function gt(column: any, value: any): any;
  export function gte(column: any, value: any): any;
  export function lt(column: any, value: any): any;
  export function lte(column: any, value: any): any;
  export function desc(column: any): any;
  export function asc(column: any): any;
  export function or(...conditions: any[]): any;
  export function ilike(column: any, value: string): any;
  export function inArray(column: any, values: any[]): any;
  export function sql(strings: TemplateStringsArray, ...values: any[]): any;
  export function like(column: any, value: string): any;
  export function isNull(column: any): any;
  export function isNotNull(column: any): any;
  export function between(column: any, min: any, max: any): any;
}

declare module 'drizzle-orm/pg-core' {
  export function pgTable(name: string, columns: any, extra?: any): any;
  export function uuid(name: string, config?: any): any;
  export function varchar(name: string, config?: { length?: number }): any;
  export function text(name: string): any;
  export function timestamp(name: string, config?: { withTimezone?: boolean }): any;
  export function json(name: string): any;
  export function boolean(name: string): any;
  export function integer(name: string): any;
  export function decimal(name: string, config?: { precision?: number; scale?: number }): any;
  export function pgEnum(name: string, values: string[]): any;
  export function serial(name: string): any;
  export function primaryKey(...columns: any[]): any;
  export function unique(name: string): any;
  export function index(name: string): any;
  export function foreignKey(config: any): any;
  export function check(name: string, condition: any): any;
  export function _default(value: any): any;
  export function notNull(): any;
  export function uniqueIndex(name: string): any;
  export function real(name: string): any;
  export function doublePrecision(name: string): any;
  export function bigint(name: string, config?: { mode: 'number' | 'bigint' }): any;
  export function char(name: string, config?: { length: number }): any;
  export function cidr(name: string): any;
  export function date(name: string, config?: any): any;
  export function inet(name: string): any;
  export function interval(name: string, config?: any): any;
  export function macaddr(name: string): any;
  export function macaddr8(name: string): any;
  export function numeric(name: string, config?: { precision?: number; scale?: number }): any;
  export function point(name: string): any;
  export function line(name: string): any;
  export function smallint(name: string): any;
  export function time(name: string, config?: any): any;
  export function jsonb(name: string): any;
}

declare module 'drizzle-orm/postgres-js' {
  export function drizzle(connection: any, config?: any): any;
}
