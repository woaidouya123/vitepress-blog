export const useMouseOver = (overCallback, outCallback, delayed) => {
    let timer = null;
    const mouseOver = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            overCallback();
            clearTimeout(timer);
            timer = null;
        }, delayed);
    }
    const mouseOut = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            outCallback();
            clearTimeout(timer);
            timer = null;
        }, delayed);

    }
    return {
        mouseOver,
        mouseOut
    }
}
