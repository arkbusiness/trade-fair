import { createMetaTitle } from '@/app/core/shared/utils';
import { ActivatePage } from '@/app/module/exhibitor/activate/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Set Password')
};

export default function ExhibitorActivate() {
  return <ActivatePage />;
}
