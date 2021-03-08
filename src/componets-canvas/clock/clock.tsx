import React, { CSSProperties, memo, NamedExoticComponent, useEffect, useRef } from "react";

type CanvasFireworkProps = {
    style?: CSSProperties;
    className?: string;
};

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

        /** 绘制时分秒 */
        const drawClock = () => {
            if (canvasRef.current && containerRef.current) {
                const ctx = canvasRef.current.getContext("2d");

                const { clientHeight, clientWidth } = containerRef.current;
                const x = clientWidth / 2;
                const y = clientHeight / 2;
                if (ctx) {
                    ctx.save();
                    ctx.clearRect(0, 0, clientWidth, clientHeight);
                    const time = new Date();
                    // 12进制的小时
                    const hour = time.getHours() >= 12 ? time.getHours() - 12 : time.getHours();
                    const min = time.getMinutes();
                    const sec = time.getSeconds();

                    ctx.lineCap = "round";
                    ctx.fillStyle = "#000";
                    // 绘制小时的横条

                    ctx.translate(x, y);
                    ctx.rotate((hour * Math.PI) / 12 - Math.PI / 2);
                    ctx.fillRect(0, 0, 50, 4);
                    ctx.rotate(-((hour * Math.PI) / 12 - Math.PI / 2));

                    // 绘制分

                    ctx.rotate((min * Math.PI) / 30 - Math.PI / 2);
                    ctx.fillRect(0, 0, 100, 2);
                    ctx.rotate(-((min * Math.PI) / 30 - Math.PI / 2));
                    ctx.fillStyle = "#f40";

                    ctx.rotate((sec * Math.PI) / 30 - Math.PI / 2);
                    ctx.beginPath();
                    ctx.fillRect(0, 0, 120, 1);
                    ctx.rotate(-((sec * Math.PI) / 30 - Math.PI / 2));
                    ctx.fill();

                    setTimeout(() => {
                        ctx.restore();
                        drawClock();
                    }, 1000);
                }
            }
        };

        useEffect(() => {
            initCanvas();
        }, []);

        useEffect(() => {
            requestAnimationFrame(drawClock);
        }, []);

        return (
            <div style={style} className={className} ref={containerRef}>
                <canvas ref={canvasRef} />
            </div>
        );
    }
);

export default CanvasFirework;
