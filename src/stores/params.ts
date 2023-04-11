import { writable } from 'svelte/store';
import { type Param } from '../models/param';

export const params = writable<Param>([
    { id: 1, name: 'param1', type: 'list' },
    { id: 2, name: 'param2', type: 'number' },
    { id: 3, name: 'param3', type: 'string' },
]);

