import { autoDraftCases } from './autoDraftCases.js';
import { demoCases } from './cases.js';
import { openSourceCases } from './openSourceCases.js';
import { sourceCases } from './sourceCases.js';

export const allCases = [...sourceCases, ...openSourceCases, ...demoCases, ...autoDraftCases];
