/**
 * Star 渲染单位
 *
 * pos 位置数据[x, y]
 * vector 方向向量
 * speed 速度
 * color 颜色
 */
class Star {
    pos: number[];
    vector: number[];
    speed: number;
    color: string;
    time: number;
    // 构造方法
    constructor(pos: number[], vector: number[], speed: number, time?: number) {
        this.pos = pos;
        this.vector = vector;
        this.speed = speed;
        this.color = "#ffffff";
        this.time = time || 100;
    }

    // 绘制方法
    draw(ctx: CanvasRenderingContext2D, color?: string) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = color || this.color;
        ctx.globalAlpha = Math.max(0.1, (100 - this.time) / 100);
        // ctx.globalAlpha = 0.2;
        ctx.fill();
        ctx.restore();
    }

    // 移动方法
    move() {
        this.pos[0] += this.vector[0] * this.speed;
        this.pos[1] += this.vector[1] * this.speed;
        this.time -= this.speed;
    }
}

const generateStar = (width, height) => {
    let centerX = width / 2, centerY = height / 2;
    let x = Math.random() * width, y = Math.random() * height;
    let disX = x - centerX, disY = y - centerY, dis = Math.sqrt(disX * disX + disY * disY);
    return new Star([x, y], [disX / dis, disY / dis], dis / 500)
}

export const useStarTail = (canvas: HTMLCanvasElement) => {
    let { height, width } = canvas;
    console.log(height, width, 666)
    const ctx = canvas.getContext("2d");
    let stars: Star[] = new Array(100).fill(0).map(() => generateStar(width, height))
    const drawStars = () => {
        let color = getComputedStyle(document.documentElement).getPropertyValue("--vp-c-text-1").trim();
        ctx?.clearRect(0, 0, width, height);
        stars.forEach((star, i) => {
            if (star.time <= 0) {
                stars[i] = generateStar(width, height);
            };
            if (ctx != null) {
                star.draw(ctx, color);
            }
            star.move();
        })
        requestAnimationFrame(drawStars)
    }
    drawStars();
}
