export const StatusConst = ['Open', 'In-Progress', 'Resolved', 'Re-opened', 'Tested', 'Deployed', 'Closed'] as const;

export type StatusConst = (typeof StatusConst)[keyof typeof StatusConst];