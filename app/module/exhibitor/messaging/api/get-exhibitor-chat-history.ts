import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { clientAxios } from '@/app/core/shared/lib';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

interface IMessage {
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

interface IMessages {
  attendeeId: string;
  attendeeEmail: string;
  attendeeLogoUrl: string | null;
  attendeeName: string;
  messages: IMessage[];
}

interface IMessagesResponse {
  data: IMessages[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const exhibitorMessagesKey = {
  allMessages: (filter: Record<string, string>) => [
    'all-exhibitor-messages',
    filter
  ]
};

const fetchMessages = async ({
  pageParam = 1
}: {
  pageParam?: number;
}): Promise<IMessagesResponse> => {
  const queryParams = buildQueryParams({
    params: {
      page: pageParam.toString(),
      limit: '200'
    }
  });
  try {
    const response = await clientAxios({
      method: 'get',
      url: `/exhibitor/messages${queryParams ? `?${queryParams}` : ''}`
    });
    const responseData = response.data as IMessagesResponse;

    return responseData;
  } catch (error: unknown) {
    throw error;
  }
};

export const useExhibitorChatHistory = (
  filter: Record<string, string> = {}
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page, ...filterWithoutPage } = filter;

  const {
    data,
    error,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    status,
    isLoading
  } = useInfiniteQuery({
    queryKey: exhibitorMessagesKey.allMessages(filterWithoutPage),
    queryFn: fetchMessages,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Check if there are more pages available
      if (lastPage.page < lastPage.pages) {
        return lastPage.page + 1;
      }
      return undefined; // No more pages
    },
    getPreviousPageParam: (firstPage) => {
      // Check if there are previous pages available
      if (firstPage.page > 1) {
        return firstPage.page - 1;
      }
      return undefined; // No previous pages
    }
  });

  const chats = data?.pages?.[0];
  const chatsData = chats?.data;

  const paginationMeta = extractPaginationMeta(chats);

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleFetchPreviousPage = () => {
    if (hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  };

  return {
    handleFetchNextPage,
    handleFetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
    status,
    error,
    data: chatsData ?? EMPTY_ARRAY,
    paginationMeta
  };
};
