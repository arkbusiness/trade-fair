import { getQueryClient, serverFetcher } from '@/app/core/shared/lib';
import { ExhibitorDetailHeader } from '../atoms';
import { ExhibitorDetailHero } from '../molecules';
import { organizerExhibitorsService } from '../../services';
import { notFound } from 'next/navigation';

export const ExhibitorsDetailPage = async ({ id }: { id: string }) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: organizerExhibitorsService.getExhibitorById(id).queryKey,
    queryFn: () => {
      return serverFetcher({
        url: organizerExhibitorsService.getExhibitorById(id).url
      });
    }
  });

  const exhibitor = queryClient.getQueryData(
    organizerExhibitorsService.getExhibitorById(id).queryKey
  );

  if (!exhibitor) {
    return notFound();
  }

  return (
    <div className="w-full flex flex-col" id="exhibitor-detail">
      <div className="no-print">
        <ExhibitorDetailHeader id={id} />
      </div>
      <div className="mt-6">
        <ExhibitorDetailHero id={id} />
        <div className="mt-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          repellat laudantium eum accusantium voluptas nemo voluptatibus,
          veritatis obcaecati incidunt expedita distinctio ipsa dolorum illum
          corporis officia quidem inventore! Voluptatum, non?
        </div>
      </div>
    </div>
  );
};
