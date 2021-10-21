import Skeleton from "react-loading-skeleton"

const GallerieSkeleton = (props) => {
    return (
        <div>
            <Skeleton count={props.countValue} width={400} height={400}style={{
                 background: '#00800063',
                 borderRadius: 'none'
            }}/>
        </div>
    )
}

export default GallerieSkeleton
