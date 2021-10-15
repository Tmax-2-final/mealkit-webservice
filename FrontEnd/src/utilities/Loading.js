import Loader from "react-loader-spinner";

export default function Loading({height, width, timeout}) {
    return (
        <Loader
            type="Oval"
            color="#fff"
            height={height}
            width={width}
            timeout={timeout} //3 secs
         />
    );
}