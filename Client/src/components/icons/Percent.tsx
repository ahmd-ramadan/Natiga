interface IPercentProps {
    color?: string;
    size?: string;
}
const PercentIcon = ({ color = "var(--color-primary)", size = "20px" }: IPercentProps) => {
    return (
        <svg width={size} height={size} fill={color} viewBox="-1.7 0 20.4 20.4" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zM5.909 9.536a1.812 1.812 0 1 0-1.812-1.813 1.814 1.814 0 0 0 1.812 1.813zm0-1.109a.704.704 0 1 1 .704-.704.705.705 0 0 1-.704.704zm5.72-1.402a.792.792 0 1 0-1.316-.88l-4.924 7.372a.792.792 0 0 0 1.317.88zm1.286 5.837a1.812 1.812 0 1 0-1.812 1.812 1.814 1.814 0 0 0 1.812-1.812zm-1.109 0a.704.704 0 1 1-.703-.704.705.705 0 0 1 .703.704z"></path></g></svg>
    );
}

export default PercentIcon;
