import React from "react";

interface PointProps {
    top: number; // theo %
    left: number; // theo %
    point: number;
    zIndex: number;
    clearPoint: (point: number) => void;
}

const Point: React.FC<PointProps> = ({ top, left, point, zIndex, clearPoint }) => {
    return (
        <div
            onClick={() => clearPoint(point)}
            style={{
                top: `${top}%`,
                left: `${left}%`,
                zIndex,
            }}
            className="absolute w-10 h-10 flex items-center justify-center rounded-full border border-black bg-white cursor-pointer 
                       transform -translate-x-1/2 -translate-y-1/2 select-none text-sm sm:w-12 sm:h-12 sm:text-base"
        >
            {point}
        </div>
    );
};

export default Point;
