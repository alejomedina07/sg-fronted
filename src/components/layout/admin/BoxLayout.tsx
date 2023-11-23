import { ReactNode } from 'react';

interface BoxLayoutProps {
  children: ReactNode;
}

export const BoxLayout = (props: BoxLayoutProps) => {
  const { children } = props;
  return (
    <div className="mx-2">
      <div className=" border-2 rounded sm:p-8 p-4">{children}</div>
    </div>
  );
};
