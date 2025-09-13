interface TrustScoreProps {
  score: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const TrustScore = ({ score, size = 'md', showLabel = true, className = '' }: TrustScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'High Trust';
    if (score >= 60) return 'Medium Trust';
    return 'Low Trust';
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-1';
      case 'lg':
        return 'text-lg px-4 py-2';
      default:
        return 'text-sm px-3 py-1.5';
    }
  };

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <div
        className={`inline-flex items-center rounded-full font-semibold ${getScoreColor(score)} ${getSizeClasses(size)}`}
      >
        <span className="mr-1">✓</span>
        {score}/100
      </div>
      {showLabel && (
        <span className={`font-medium ${getScoreColor(score).split(' ')[0]}`}>
          {getScoreLabel(score)}
        </span>
      )}
    </div>
  );
};

export default TrustScore;
