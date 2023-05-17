import { writable } from 'svelte/store';

export const FIFOQueue = <T>() => {
    const { subscribe, update, set } = writable<T[]>([])

    return {
        queue: { subscribe },
        enqueue: (item: T) => {
            update(prev => [...prev, item]);
        },
        dequeue: () => {
            if (subscribe.length === 0) {
                return subscribe;
            }
            update(prev => prev.slice(1))
        },
        reset: () => set([])
    };
};
