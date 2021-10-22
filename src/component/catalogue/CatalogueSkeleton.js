import Skeleton from "react-loading-skeleton";
import MediaQuery from "react-responsive";

const CatalogueSkeleton = () => {
    return (
        <div className='catalogueImg'>
            <MediaQuery minWidth={300} maxWidth={500}>
            <Skeleton count={2} height={300} width={300} style={
                {
                    background: '#00800063',
                    borderRadius: 'none'
                    
                }
                } />
            </MediaQuery>
            <MediaQuery minWidth={501} maxWidth={2000}>
            <Skeleton count={2} height={500} width={600} style={
                {
                    background: '#00800063',
                    borderRadius: 'none'
                    
                }
                } />
            </MediaQuery>
            </div>
        
    );
}

export default CatalogueSkeleton
