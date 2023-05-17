export const wait = () =>
    new Promise<void>((resolve) =>
        setTimeout(resolve, Math.random() * 500 + 200)
    );