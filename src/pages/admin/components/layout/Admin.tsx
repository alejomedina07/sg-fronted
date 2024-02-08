import { BoxLayout, LayoutMain } from '../../../../components/layout/admin';
import { Outlet } from 'react-router-dom';

export const Admin = () => {
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
