// const XSvg = (props) => (
//     <svg width={size} height={size} viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
//         <text x="10" y="60" fontFamily="Arial" fontSize="60" fill={color} {...props}>
//             LTU
//         </text>
//     </svg>
// );
// export default XSvg;
const XSvg = (props) => (
    <svg aria-hidden='true' viewBox='0 0 200 100' {...props}>
        <text x="10" y="75" fontFamily="Arial" fontSize="80" fill="currentColor">
            LTU
        </text>
    </svg>
);

export default XSvg;

