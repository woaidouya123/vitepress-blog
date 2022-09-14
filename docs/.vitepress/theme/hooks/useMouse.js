export const useMouseOver = (callback, delayed) => {
    let timer = null;
    const mouseOver = () => {
        timer = setTimeout(() => {
            callback();
            clearTimeout(timer);
            timer = null;
        }, delayed);
    }
    const mouseOut = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }
    return {
        mouseOver,
        mouseOut
    }
}
