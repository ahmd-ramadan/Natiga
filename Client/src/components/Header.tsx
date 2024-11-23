import Image from "next/image";


const Header = () => {
    return (
        <header className="w-full bg-black">
            <div className="w-full px-[5%] md:px-[10%] shadow-lg flex justify-between gap-2 items-center py-2">
                
                {/* Title */}
                <div className="">
                    <h1 className="text-lg font-bold text-white">مركز اقرأ وارتق التعليمي</h1>
                </div>

                {/* Logo */}
                <div className="relative w-50 h-50">
                    <Image 
                        src="/logo.png"
                        alt="Logo Image"
                        // layout="fill"
                        // objectFit="cover"
                        width={80}
                        height={60}
                    />
                </div>

            </div>
        </header>
    );
}

export default Header;