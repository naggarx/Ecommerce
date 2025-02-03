const LoadingSpinner = () => {
    return (
      <div className='absolute inset-0 flex items-center justify-center bg-white'>
        <div className='relative'>
          <div className='w-12 h-12 border-2 border-gray-200 rounded-full' />
          <div className='w-12 h-12 border-t-2 border-blue-500 animate-spin rounded-full absolute left-0 top-0' />
          <div className='sr-only'>Loading</div>
        </div>
      </div>
    );
  };
  
  export default LoadingSpinner;