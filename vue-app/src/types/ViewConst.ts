export const ViewConst = {
  List: 'list',
  Form: 'form'
} as const;

export type ViewConst = (typeof ViewConst)[keyof typeof ViewConst];