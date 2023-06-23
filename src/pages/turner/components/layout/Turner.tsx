import { BoxLayout, LayoutMain } from '../../../../components/layout/admin';
import { Outlet } from 'react-router-dom';

export const Turner = () => {
  return (
    <LayoutMain>
      <div className="w-full">
        <BoxLayout>
          <Outlet />
        </BoxLayout>
      </div>
    </LayoutMain>
  );
};
