import React from "react";

interface TempPoint {
  date: string; // e.g. "2025-06-05"
  temp: number;
}

interface DataVisualizationProps {
  data: TempPoint[];
  unit: "C" | "F";
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  data,
  unit,
}) => {
  const width = Math.max(700, data.length * 70); // dynamic width for spacing
  const padding = 55;
  const height = 250;

  const temps = data.map((d) => d.temp);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);

  const getX = (i: number) =>
    padding + (i * (width - 2 * padding)) / (data.length - 1);

  const getY = (temp: number) =>
    height -
    padding -
    ((temp - minTemp) / (maxTemp - minTemp)) * (height - 2 * padding);

  const points = data.map((d, i) => `${getX(i)},${getY(d.temp)}`).join(" ");

  // Generate horizontal grid lines for temps
  const gridLinesCount = 5;
  const tempStep = (maxTemp - minTemp) / gridLinesCount;
  const gridLines = Array.from({ length: gridLinesCount + 1 }, (_, i) => {
    const tempValue = minTemp + i * tempStep;
    const y = getY(tempValue);
    return { y, tempValue: tempValue.toFixed(1) };
  });

  return (
    <div
      className="chart-container"
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#444",
        userSelect: "none",
        maxWidth: width,
        margin: "auto",
      }}
    >
      <svg width={width} height={height}>
        {/* Horizontal grid lines */}
        {gridLines.map(({ y, tempValue }, i) => (
          <g key={i}>
            <line
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#e0e0e0"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <text
              x={padding - 10}
              y={y + 4}
              fontSize={12}
              fill="#666"
              textAnchor="end"
            >
              {tempValue}°
            </text>
          </g>
        ))}

        {/* Axes */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#999"
          strokeWidth={1.5}
        />
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#999"
          strokeWidth={1.5}
        />

        {/* Temperature line */}
        <polyline
          fill="none"
          stroke="#0d6efd"
          strokeWidth="3"
          points={points}
          style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" }}
        />

        {/* Dots */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={getX(i)}
            cy={getY(d.temp)}
            r={6}
            fill="#0d6efd"
            stroke="#fff"
            strokeWidth={2}
            style={{ cursor: "pointer", transition: "r 0.2s ease" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as SVGCircleElement).r.baseVal.value = 8)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as SVGCircleElement).r.baseVal.value = 6)
            }
          />
        ))}

        {/* Date labels on x-axis */}
        {data.map((d, i) => (
          <text
            key={i}
            x={getX(i)}
            y={height - padding + 25}
            textAnchor="middle"
            fontSize="12"
            fill="#555"
            style={{ fontWeight: "600" }}
          >
            {d.date.slice(6, 10) + " " + d.date.slice(11, 16)}
          </text>
        ))}
      </svg>

      <p
        className="unit-label"
        style={{
          textAlign: "center",
          marginTop: 10,
          fontSize: 16,
          fontWeight: "700",
          color: "#0d6efd",
        }}
      >
        Temperature (°{unit})
      </p>
    </div>
  );
};
