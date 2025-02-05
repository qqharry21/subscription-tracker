export {};
declare global {
  interface IntlMessages extends Messages, ZodMessages {}
  interface PropsWithChildren {
    children: React.ReactNode | React.ReactNode[];
  }
}
