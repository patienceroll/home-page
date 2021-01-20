import React, { CSSProperties, memo, NamedExoticComponent, useEffect, useRef } from "react";

type CanvasFireworkProps = {
    style?: CSSProperties;
    className?: string;
};

type point = { x: number; y: number };

const CanvasFirework: NamedExoticComponent<CanvasFireworkProps> = memo(
    ({ style = {}, className }) => {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        /** 初始化canvas */
        const initCanvas = () => {
            if (canvasRef.current && containerRef.current) {
                const width = containerRef.current.clientWidth || 300;
                const height = containerRef.current.clientHeight || 200;
                canvasRef.current.width = width;
                canvasRef.current.height = height;
            }
        };

        /** 画圆饼圆形图 */
        const drawCircle = (ctx: CanvasRenderingContext2D) => {
            // 画制圆环饼图
            for (let r = 1; r <= 6; r++) {
                ctx.save();
                ctx.fillStyle = "rgb(" + 42.5 * r + "," + (255 - 42.5 * r) + ",255)";
                ctx.translate(100, 100);
                for (let d = 1; d <= r * 6; d++) {
                    ctx.rotate((Math.PI * 2) / (6 * r));
                    ctx.beginPath();
                    ctx.arc(r * 15, 0, 5, 0, 2 * Math.PI);
                    ctx.fill();
                }
                ctx.restore();
            }
        };

        /** 画直线 */
        const drawLine = (
            ctx: CanvasRenderingContext2D,
            option: { startPoint: point; endPoint: point }
        ) => {
            const { startPoint, endPoint } = option;
            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.closePath();
            ctx.stroke();
        };

        /** 练习 canvas ransform */
        const testTransiform = (ctx: CanvasRenderingContext2D) => {
            ctx.save();
            ctx.fillStyle = "#f40";

            ctx.transform(1, Math.sin((Math.PI * 2) / 3), 0, 1, 0, 0);
            ctx.fillRect(10, 400, 100, 10);
        };

        /** 练习绘制 */
        const draw = () => {
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext("2d");
                if (ctx) {
                    drawLine(ctx, { startPoint: { x: 100, y: 100 }, endPoint: { x: 100, y: 300 } });
                    drawCircle(ctx);
                    testTransiform(ctx);
                }
            }
        };

        useEffect(() => {
            initCanvas();
        }, []);

        useEffect(() => {
            draw();
        }, []);

        return (
            <div style={style} className={className} ref={containerRef}>
                <canvas ref={canvasRef} />
            </div>
        );
    }
);

export default CanvasFirework;
