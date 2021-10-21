import Skeleton,{SkeletonTheme} from "react-loading-skeleton";

const CatalogueSkeleton = () => {
    return (
        <div className='catalogueImg'>
            <Skeleton count={2} height={500} width={600} style={
                {
                    background: '#00800063',
                    borderRadius: 'none'
                    
                }
                } />
            </div>
        
    );
}

export default CatalogueSkeleton
