declare module '@opentelemetry/api' {
  export const trace: any;
  export const SpanStatusCode: any;
  export const SpanKind: any;
  export const context: any;
  export const Span: any;
  export function getSpan(context: any): any;
  export function setSpan(context: any, span: any): any;
}