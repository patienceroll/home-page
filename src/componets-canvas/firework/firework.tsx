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

        /** 练习绘制 */
        const draw = () => {
            if (canvasRef.current) {
                const context2d = canvasRef.current.getContext("2d");
                if (context2d) {
                    context2d.strokeStyle = "orange";
                    context2d.fillStyle = "green";
                    context2d.fillRect(110, 10, 80, 80);
                    context2d.strokeRect(100, 0, 100, 100);
                    context2d.clearRect(125, 25, 50, 50);

                    // 绘制实心三角形
                    context2d.strokeStyle = "red";
                    context2d.fillStyle = "#999";
                    context2d.beginPath();
                    context2d.moveTo(300, 0);
                    context2d.lineTo(300, 100);
                    context2d.lineTo(300 + Math.sqrt(3) * 100, 100);
                    context2d.fill();

                    // 绘制等边空心三角形
                    context2d.beginPath();
                    context2d.moveTo(550, 0);
                    context2d.lineTo(550, 100);
                    context2d.lineTo(550 + Math.sqrt(3) * 50, 50);
                    context2d.closePath();
                    context2d.stroke();

                    // 绘制一个圆
                    context2d.beginPath();
                    context2d.arc(800, 50, 50, Math.PI, (3 / 2) * Math.PI);
                    context2d.lineTo(800, 50);
                    context2d.closePath();
                    context2d.stroke();

                    // 绘制一个圆弧
                    context2d.beginPath();
                    context2d.arc(150, 250, 50, -Math.PI / 2, (7 * Math.PI) / 6);
                    context2d.stroke();

                    // 绘制一个残缺的圆
                    context2d.beginPath();
                    context2d.arc(350, 250, 50, -Math.PI / 2, (7 * Math.PI) / 6);
                    context2d.fill();

                    // 绘制一个二次贝塞尔曲线
                    context2d.beginPath();
                    context2d.moveTo(450, 300);
                    context2d.quadraticCurveTo(480, 230, 550, 200);
                    context2d.stroke();

                    // 绘制一个气泡
                    context2d.beginPath();
                    context2d.moveTo(650, 250);
                    context2d.quadraticCurveTo(650, 200, 750, 200);
                    context2d.quadraticCurveTo(850, 200, 850, 250);
                    context2d.quadraticCurveTo(850, 300, 750, 300);
                    context2d.quadraticCurveTo(740, 320, 720, 320);
                    context2d.quadraticCurveTo(735, 310, 740, 300);
                    context2d.quadraticCurveTo(650, 300, 650, 250);
                    context2d.stroke();

                    // 创建一个path2D对象
                    const circle = new Path2D();
                    circle.arc(150, 400, 50, 0, Math.PI / 2);
                    circle.lineTo(150, 350);
                    circle.closePath();
                    context2d.stroke(circle);

                    // 填充不同的颜色(调色板)
                    for (let x = 1; x <= 8; x++) {
                        for (let y = 1; y <= 8; y++) {
                            context2d.fillStyle = `rgb(${Math.floor(255 - 31.875 * x)},${Math.floor(
                                255 - 31.875 * y
                            )},0)`;
                            context2d.fillRect(250 + x * 40, 300 + y * 40, 40, 40);
                        }
                    }

                    // 填充不同颜色的圈圈
                    for (let x = 1; x <= 8; x++) {
                        for (let y = 1; y <= 8; y++) {
                            context2d.strokeStyle = `rgb(${Math.floor(
                                255 - 31.875 * x
                            )},${Math.floor(255 - 31.875 * y)},0)`;
                            context2d.beginPath();
                            context2d.arc(600 + x * 40, 315 + y * 40, 15, 0, 2 * Math.PI);
                            context2d.stroke();
                        }
                    }

                    // 连接几条线
                    context2d.lineCap = "round";
                    context2d.lineWidth = 10;
                    context2d.beginPath();
                    context2d.moveTo(100, 600);
                    context2d.lineTo(150, 650);
                    context2d.stroke();

                    context2d.lineTo(200, 600);
                    context2d.lineJoin = "round";
                    context2d.stroke();

                    context2d.lineTo(250, 650);
                    context2d.lineJoin = "bevel";
                    context2d.stroke();

                    context2d.setLineDash([10, 10]);
                    context2d.lineTo(200, 700);
                    context2d.stroke();
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
