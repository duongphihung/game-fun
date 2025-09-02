
type Props = {
    gameStatus: string;

}
const GameStatus = ({ gameStatus }: Props) => {
    return (
        <div className="text-2xl font-bold">
            {gameStatus}
        </div>
    )
}

export default GameStatus