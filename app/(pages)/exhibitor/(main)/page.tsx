import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Exhibitor'),
  description: ARK_META.description
};

export default async function ExhibitorOverview() {
  return (
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga repellendus
      sint debitis odio reiciendis! Quas dolores officia sapiente. Assumenda
      voluptatibus optio sit nulla, odit deserunt ea ipsum repellat laborum
      placeat!
    </>
  );
}
