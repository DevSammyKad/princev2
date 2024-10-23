import EditAccountForm from '@/app/components/storefront/EditAccountForm';
import prisma from '@/lib/db';
import React from 'react';

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return data;
}

const AccountPageRoute = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  return (
    <div>
      <EditAccountForm data={data} />
    </div>
  );
};

export default AccountPageRoute;
