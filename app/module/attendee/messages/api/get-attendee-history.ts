import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { clientAxios } from '@/app/core/shared/lib';
import { IPaginatedResponse } from '@/app/core/shared/types';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface Messages {
  id: string;
  senderType: string;
  senderId: string;
  receiverType: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
  readAt: string | null;
  attachmentUrl: string | null;
  attachmentType: string | null;
}

interface MessagesResponse {
  exhibitorId: string;
  exhibitorEmail: string;
  exhibitorLogoUrl: string;
  exhibitorName: string;
  messages: Messages[];
}

const attendeeMessagesKey = {
  allMessages: (filter: Record<string, string>) => [
    'all-attendee-messages',
    filter
  ]
};

const fetchMessages = async ({
  pageParam = 1
}: {
  pageParam?: number;
}): Promise<IPaginatedResponse<MessagesResponse>> => {
  const queryParams = buildQueryParams({
    params: {
      page: pageParam.toString(),
      limit: '200'
    }
  });

  try {
    const response = await clientAxios({
      method: 'get',
      url: `/attendee/messages${queryParams ? `?${queryParams}` : ''}`
    });
    const responseData = response.data as IPaginatedResponse<MessagesResponse>;

    return responseData;
  } catch (error: unknown) {
    throw error;
  }
};

export const useAttendeeChatHistory = (filter: Record<string, string> = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page, ...filterWithoutPage } = filter;

  const {
    data,
    isLoading,
    isRefetching,
    isPending,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: attendeeMessagesKey.allMessages(filterWithoutPage),
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => {
      const currentPage = parseInt(lastPage.page?.toString() || '1');
      const totalPages = lastPage.totalPages || lastPage.pages || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1
  });

  // Get pagination meta from the last page
  const paginationMeta = useMemo(() => {
    const lastPage = data?.pages[data.pages.length - 1];
    return extractPaginationMeta(lastPage);
  }, [data?.pages]);

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const chatsData = data?.pages?.flatMap((pg) => pg.data);

  return {
    chatsData: chatsData ?? EMPTY_ARRAY,
    paginationMeta,
    isLoadingMessages: isLoading,
    isRefetchingMessages: isRefetching,
    isMessagesPending: isPending,
    refetchMessages: refetch,
    handleFetchNextPage,
    hasNextPage,
    isFetchingNextPage
  };
};
