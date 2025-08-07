import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Organizer'),
  description: ARK_META.description
};

export default async function Organizer() {
  return (
    <>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit rem dolor expedita. Corporis odio veritatis, recusandae a eius exercitationem doloribus rem, deleniti assumenda omnis eaque, facere eos. Corrupti, eveniet ut.
    </>
  )
}
