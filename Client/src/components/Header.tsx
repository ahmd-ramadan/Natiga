// import Image from "next/image";

import Image from "next/image";


// const Header = () => {
//     return (
//         <header className="w-full bg-primary">
//             <div className="w-full px-2 sm:px-[10%] md:px-[20%] shadow-lg flex justify-between gap-2 items-center py-1">
                
//                 {/* Title */}
//                 <div className="">
//                     <h1 className="font-bold text-lg text-white">مركز اقْرَأ وَارْتَقِ التعليمي 👨🏻‍🎓👩🏻‍🎓</h1>
//                 </div>

//                 {/* Logo */}
//                 <div className="relative">
//                     <Image 
//                         src="/logo.png"
//                         alt="Logo Image"
//                         // layout="fill"
//                         // objectFit="cover"
//                         width={100}
//                         height={80}
//                     />
//                 </div>

//             </div>
//         </header>

//     );
// }

// export default Header;


interface IProps {
    
}

const Header = ({  }: IProps) => {
    return (
        <div className="mt-4 w-60 h-60 rounded-full shadow-md mx-auto p-2 bg-primary">
            <div className="w-full h-full relative">
                <Image 
                    src="/logo.png"
                    alt=""
                    objectFit="cover"
                    layout="fill"
                />
            </div>
        </div>
    );
}

export default Header;