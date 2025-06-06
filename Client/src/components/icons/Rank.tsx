interface IYearProps {
    color?: string;
    size?: string;
}
const RankIcon = ({ color = "var(--color-primary)", size = "20px" }: IYearProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.3 8.1101L14.62 10.7501C14.8 11.1101 15.28 11.4701 15.68 11.5301L18.07 11.9301C19.6 12.1901 19.96 13.2901 18.86 14.3901L17 16.2501C16.69 16.5601 16.51 17.1701 16.61 17.6101L17.14 19.9201C17.56 21.7401 16.59 22.4501 14.98 21.5001L12.74 20.1701C12.33 19.9301 11.67 19.9301 11.26 20.1701L9.01996 21.5001C7.40996 22.4501 6.43995 21.7401 6.85995 19.9201L7.38998 17.6101C7.48998 17.1801 7.30997 16.5701 6.99997 16.2501L5.13998 14.3901C4.03998 13.2901 4.39996 12.1801 5.92996 11.9301L8.31997 11.5301C8.71997 11.4601 9.19997 11.1101 9.37997 10.7501L10.7 8.1101C11.41 6.6801 12.59 6.6801 13.3 8.1101Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M6 9V2" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M18 9V2" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M12 4V2" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>    
    );
}

export default RankIcon;
