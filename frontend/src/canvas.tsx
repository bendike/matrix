import { useRef, useEffect, useCallback, useMemo } from "react";
import { areAllNumbers } from "./utils";

type Props = {
    data: (number | null)[][];
};

const IgnitePlot = ({ data }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Get the biggest spend value to get a feeling for how big
    // the circles should be drawn
    const maxSpend = useMemo(
        () =>
            data.reduce((prev, current) => Math.max(prev, current[2] ?? 0), 0),
        [data],
    );

    // Transform x value to logarithmic scale
    function logX(x: number, width: number) {
        const minLog = Math.log(0.1);
        const maxLog = Math.log(100);
        const logValue = Math.log(x);
        return ((logValue - minLog) / (maxLog - minLog)) * width;
    }

    const draw = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            width: number,
            height: number,
            data: (number | null)[][],
        ) => {
            // Draw y-axis
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, height);
            ctx.strokeStyle = "grey";
            ctx.stroke();

            // x-axis
            const values = [
                0.1, 0.2, 0.4, 0.6, 0.8, 1, 2, 4, 6, 8, 10, 20, 40, 60, 80, 100,
            ];
            values.forEach((v) => {
                const x = logX(v, width);
                // Draw vertical lines
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.strokeStyle = "grey";
                ctx.stroke();

                // Draw x-axis labels
                ctx.fillText(v.toString() + "%", x + 5, height - 5);
            });

            // y-axis
            for (let i = -100; i <= 100; i += 20) {
                const y = height / 2 - ((i / 100) * height) / 2;
                // Draw horizontal lines
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.strokeStyle = "grey";
                ctx.stroke();

                if (i !== -100) {
                    // Draw y-axis labels
                    ctx.fillText(i.toString() + "%", 5, y - 5);
                }
            }

            data.forEach((d) => {
                // Ignore data rows where some fields are null
                if (!areAllNumbers(d)) {
                    return;
                }

                const ebit_margin = d[0];
                const share_of_wallet = d[1];
                const spend = d[2];
                console.log(share_of_wallet * 100, ebit_margin * 100);

                // Some wierd math to make the smallest dots bigger
                const radius =
                    (spend / maxSpend) * 30 + 5 * (1 - spend / maxSpend);

                const x = logX(share_of_wallet * 100, width);
                const y = height / 2 - (ebit_margin * height) / 2;

                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.strokeStyle = "white";
                ctx.stroke();
            });
        },
        [maxSpend],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");
            if (context) {
                // Our draw function comes here
                draw(context, canvas.width, canvas.height, data);
            }
        }
    }, [draw, data]);

    return <canvas width={1200} height={600} ref={canvasRef} />;
};

export default IgnitePlot;
