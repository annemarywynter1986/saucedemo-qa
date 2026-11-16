export const PASSWORD = process.env.SAUCE_PASSWORD ?? 'secret_sauce';

export const USERS = {
  standard: 'standard_user',
  problem: 'problem_user',
  lockedOut: 'locked_out_user',
} as const;
