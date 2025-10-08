import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Attendee'),
  description: ARK_META.description
};

export default async function AttendeeOverview() {
  return (
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
      accusamus voluptates ex ullam quis sint facilis sed quidem excepturi
      tempora odit doloremque illo repudiandae alias, deleniti eos dignissimos
      laboriosam maiores.
    </>
  );
}
