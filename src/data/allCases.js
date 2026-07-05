import { autoDraftCases } from './autoDraftCases.js';
import { demoCases } from './cases.js';
import { sourceCases } from './sourceCases.js';

export const allCases = [...sourceCases, ...demoCases, ...autoDraftCases];
