import { useEffect, useState, useRef } from "react";
import { Input, Modal } from "antd";
import GameStatus from "./GameStatus";
import Point from "./Point";
import type { Position } from "../models/common";

const GameScreen = () => {
    const [status, setStatus] = useState("Let's Start");
    const [clearedPoints, setClearedPoints] = useState<Set<number>>(new Set());
    const [nextPoint, setNextPoint] = useState<number>(1);
    const [totalPoint, setTotalPoint] = useState(200);
    const [positions, setPositions] = useState<Position[]>([]);
    const [gameStart, setGameStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [time, setTime] = useState(0);
    const [showWinModal, setShowWinModal] = useState(false);
    const [pointEditable, setPointEditable] = useState(false);

    const holdTimer = useRef<any>(null); // giữ timer

    const MAX_TIME = 300; // 5 phút

    const initializePositions = (count: number) => {
        const newPosition: Position[] = [];
        for (let i = 0; i < count; i++) {
            newPosition.push({
                id: i,
                top: Math.random() * 95,
                left: Math.random() * 95,
                zIndex: count + 1 - i,
            });
        }
        return newPosition;
    };

    useEffect(() => {
        let interval: number = 0;

        if (gameStart && !gameOver) {
            interval = window.setInterval(() => {
                setTime((prev) => {
                    const newTime = parseFloat((prev + 0.1).toFixed(1));
                    if (newTime >= MAX_TIME) {
                        setStatus("Game Over!");
                        setGameOver(true);
                    }
                    return newTime;
                });
            }, 100);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [gameStart, gameOver]);

    useEffect(() => {
        if (status === "You Win!") {
            setShowWinModal(true);
        }
    }, [status]);

    const handleStart = () => {
        const newPositions = initializePositions(totalPoint);
        setGameStart(true);
        setPositions(newPositions);
        setClearedPoints(new Set());
        setNextPoint(1);
        setStatus("Playing...");
        setTime(0);
        setGameOver(false);
        setShowWinModal(false);
    };

    const handleReset = () => {
        setGameStart(false);
        setGameOver(false);
        setStatus("Let's Start");
        setPositions([]);
        setClearedPoints(new Set());
        setNextPoint(1);
        setTime(0);
        setShowWinModal(false);
        setPointEditable(false); // reset về mặc định disable
    };

    const clearPoint = (point: number) => {
        if (point !== nextPoint || gameOver) {
            setStatus("Game Over!");
            setGameOver(true);
            return;
        }

        setClearedPoints((prev) => new Set(prev).add(point));
        setNextPoint(point + 1);

        if (point === totalPoint) {
            setStatus("You Win!");
            setGameOver(true);
        }
    };

    // Xử lý giữ 5s

    const handleMouseDown = () => {
        holdTimer.current = setTimeout(() => {
            setPointEditable(true); // mở khóa vĩnh viễn
        }, 5000); // 5s
    };

    const handleMouseUpOrLeave = () => {
        if (holdTimer.current) {
            clearTimeout(holdTimer.current);
            holdTimer.current = null;
        }
        // ❌ bỏ setPointEditable(false) đi
    };


    return (
        <div className="h-full w-full max-w-3xl mx-auto p-4 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex flex-col gap-2">
                <GameStatus gameStatus={status} />
                <div className="flex items-center gap-2">
                    <div
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUpOrLeave}
                        onMouseLeave={handleMouseUpOrLeave}
                        className="cursor-pointer select-none"
                        title="Nhấn giữ 5s để chỉnh sửa"
                    >
                        Point:
                    </div>
                    <Input
                        type="number"
                        value={totalPoint}
                        style={{ width: "100px" }}
                        onChange={(e) => setTotalPoint(parseInt(e.target.value))}
                        disabled={!pointEditable}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div>Time:</div>
                    <div>{time.toFixed(1)}s</div>
                    <div className="text-sm text-gray-500">(max {MAX_TIME}s)</div>
                </div>
                <div className="flex items-center gap-2">
                    <div>Next Point:</div>
                    <div>{nextPoint}</div>
                </div>
                <div>
                    {!gameStart ? (
                        <button
                            onClick={handleStart}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                        >
                            Start
                        </button>
                    ) : (
                        <button
                            onClick={handleReset}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>

            {/* Khung chứa game */}
            <div className="border border-gray-300 rounded-md p-6 mt-2 flex-1 h-[calc(100%-180px)] bg-gray-100 overflow-hidden">
                <div className="relative h-full w-full">
                    {positions.map((position, index) => {
                        const pointNumber = index + 1;
                        if (clearedPoints.has(pointNumber)) return null;

                        return (
                            <Point
                                key={position.id}
                                top={position.top}
                                left={position.left}
                                point={pointNumber}
                                zIndex={position.zIndex}
                                clearPoint={clearPoint}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Modal chúc mừng */}
            <Modal
                open={showWinModal}
                onCancel={() => setShowWinModal(false)}
                footer={[
                    <button
                        key="ok"
                        onClick={() => setShowWinModal(false)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                    >
                        OK
                    </button>,
                ]}
                title="🎉 Chúc mừng! Em nhận được 100k"
            >
                <div>Chúc em sinh nhật vui vẻ :3</div>
                <div>Nhắn số tài khoản cho anh với a không biết số tài khoản của e để chuyển :v</div>
            </Modal>
        </div>
    );
};

export default GameScreen;
