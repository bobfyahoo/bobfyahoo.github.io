export const AssigneeConst = ['Robert', 'Sarah', 'James', 'Elena', 'Hiro', 'Chloe'] as const;

export type AssigneeConst = (typeof AssigneeConst)[keyof typeof AssigneeConst];