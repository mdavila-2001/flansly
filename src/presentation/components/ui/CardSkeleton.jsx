import PropTypes from 'prop-types';

export const CardSkeleton = ({ count = 3 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div 
                    key={i} 
                    className="bg-flansly-card border border-flansly-surface/30 rounded-2xl overflow-hidden p-5 space-y-4 animate-pulse shadow-lg flex flex-col justify-between"
                >
                    <div className="w-full h-24 bg-flansly-surface/50 rounded-xl" />
                    <div className="flex flex-col items-center space-y-3 -mt-10 relative z-10 flex-1">
                        <div className="w-16 h-16 rounded-full bg-flansly-surface border-4 border-flansly-card shadow-sm" />
                        <div className="h-4 bg-flansly-surface/60 rounded-md w-3/4" />
                        <div className="h-3 bg-flansly-surface/40 rounded-md w-1/2" />
                    </div>
                    <div className="pt-2 mt-4">
                        <div className="h-10 bg-flansly-surface/50 rounded-xl w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
};

CardSkeleton.propTypes = {
    count: PropTypes.number
};
