import React, { forwardRef, memo, useEffect, useRef } from 'react';

import Style from './loading.module.less';

/** 内部圆循环周期 单位ms */
const duration = 666.667;

/** 外部圆环循环周期 单位ms  */
const outerDuration = 1000;

/** 内部圆半径 单位px */
const Radius = 20;

const { PI } = Math;

const Loading = memo(
  forwardRef(() => {
  
    const contaninerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationInstance = useRef<number>();
    const lastFrameTime = useRef<number>();

    const setCanvasSize = () => {
      if (canvasRef.current && contaninerRef.current) {
        const { clientHeight, clientWidth } = contaninerRef.current;
        canvasRef.current.height = clientHeight;
        canvasRef.current.width = clientWidth;
      }
    };

    const DrawLoading: FrameRequestCallback = (time) => {
      if (typeof lastFrameTime.current === 'undefined') lastFrameTime.current = time;
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        const { width, height } = canvasRef.current;
        if (ctx) {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, width, height);
          ctx.translate(width / 2, height / 2);

          const remainTime = (time - lastFrameTime.current) % duration;
          const startAngle = 2 * PI * (remainTime / duration);
          const endAngle = startAngle + PI;
          ctx.lineWidth = 5;
          ctx.strokeStyle = '#000';
          ctx.beginPath();
          ctx.arc(0, 0, Radius, startAngle, endAngle);
          ctx.stroke();
          ctx.closePath();

          const startLength = 0.36;
          let gradientLength = 0.63;
          const gradientIncrementer = 0.05;

          while (gradientLength - gradientIncrementer > -gradientIncrementer) {
            const opacity = 1 - gradientLength / startLength;
            ctx.strokeStyle = `rgba(255, 255, 255,${opacity})`;
            ctx.beginPath();
            ctx.arc(
              0,
              0,
              Radius,
              startAngle + gradientLength,
              startAngle + gradientLength + gradientIncrementer,
            );
            ctx.stroke();
            ctx.closePath();
            gradientLength -= gradientIncrementer;
          }

          ctx.globalCompositeOperation = 'source-over';

          const arcWidth = 2;
          const outerRemainTime = (time - lastFrameTime.current) & outerDuration;
          const outerRemainPercent = outerRemainTime / outerDuration;
          const FirstTriggerPercent = 0.38;
          const SecondTriggerPercent = 0.63;

          if (
            outerRemainPercent > FirstTriggerPercent &&
            outerRemainPercent < SecondTriggerPercent
          ) {
            const percentTotal = SecondTriggerPercent - FirstTriggerPercent;
            const percentChange = outerRemainPercent - FirstTriggerPercent;
            const changeProgress = percentChange / percentTotal;

            const arcRadius = Radius + changeProgress * 20;
            const arcOpactiy = 1 - changeProgress;
            ctx.lineWidth = arcWidth;
            ctx.strokeStyle = `rgba(0,0,0,${arcOpactiy})`;
            ctx.beginPath();
            ctx.arc(0, 0, arcRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
          if (outerRemainPercent >= SecondTriggerPercent) {
            const percentTotal = 1 - SecondTriggerPercent;
            const percentChange = outerRemainPercent - SecondTriggerPercent;
            const changeProgress = percentChange / percentTotal;

            const arcRadius = Radius + changeProgress * 20;
            const arcOpactiy = 1 - changeProgress;

            ctx.lineWidth = arcWidth;
            ctx.strokeStyle = `rgba(0,0,0,${arcOpactiy})`;
            ctx.beginPath();
            ctx.arc(0, 0, arcRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      animationInstance.current = requestAnimationFrame(DrawLoading);
    };

    useEffect(() => {
      setCanvasSize();
      animationInstance.current = requestAnimationFrame(DrawLoading);

      return () => {
        if (animationInstance.current) cancelAnimationFrame(animationInstance.current);
      };
    }, []);

    return (
      <div className={Style.CT} ref={contaninerRef}>
        <canvas ref={canvasRef} />
      </div>
    );
  }),
);

export default Loading;
