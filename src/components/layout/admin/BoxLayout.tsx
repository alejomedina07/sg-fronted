import { ReactNode } from 'react';

interface BoxLayoutProps {
  children: ReactNode;
}

export const BoxLayout = (props: BoxLayoutProps) => {
  const { children } = props;
  return (
    <div className="container mx-auto">
      <div className=" border-2 rounded p-8">
        { children }
      </div>
    </div>
  );
}
