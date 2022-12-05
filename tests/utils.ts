export const resizeWindow = (x: number, y: number) => {
    // @ts-ignore
    window.innerWidth = x;
    // @ts-ignore
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
};