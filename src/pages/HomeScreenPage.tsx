import { Button } from "antd"
import { Link } from "react-router"

const HomeScreenPage = () => {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold">Xin chào năm nay sẽ chẳng có câu hỏi nào cả. Chỉ có 1 mini game nho nhỏ cho em chơi chill chill :3 </h1>
            <h3>Luật chơi thì cũng dễ tìm các điểm liên tiếp là được</h3>
            <h3>Game này rất BÌNH THƯỜNG :3</h3>
            <Button>
                <Link to="/game">Chơi ngay</Link>
            </Button>

            <img
                src="https://susach.edu.vn/upload/2024/12/meme-meo-chuc-mung-sinh-nhat-003.webp"
                className="object-cover w-[400px] h-full mx-auto"
            />
        </div>
    )
}

export default HomeScreenPage