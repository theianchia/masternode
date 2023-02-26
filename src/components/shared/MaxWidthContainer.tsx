import { FC, PropsWithChildren } from "react";

type Props = {
  darkBg?: boolean;
}

const MaxWidthContainer:FC<PropsWithChildren<Props>> = ({ children, darkBg }) => {
  const bg = darkBg ? 'bg-blue-500' : 'white';

  return (
    <div className='w-full'>
      <div className={`flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${bg}`}>
        <div className="justify-start">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MaxWidthContainer;
