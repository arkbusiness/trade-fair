import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { clientAxios } from '@/app/core/shared/lib';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

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
export const exhibitorChatMessagesKey = {
  base: 'exhibitor-chat-messages',
  messages: (filter: Record<string, string>) =>
    [exhibitorChatMessagesKey.base, filter] as const
};

const fetchMessages = async ({
  pageParam = 1,
  queryKey
}: QueryFunctionContext<
  readonly [string, Record<string, string>],
  number
>): Promise<IMessagesResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, filter] = queryKey;

  const queryParams = buildQueryParams({
    params: {
      page: pageParam.toString(),
      limit: '50',
      attendeeId: filter.attendeeId
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

export const useExhibitorChatMessages = (filter: Record<string, string>) => {
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
    queryKey: exhibitorChatMessagesKey.messages(filterWithoutPage),
    queryFn: fetchMessages,
    initialPageParam: 1,
    enabled: !!filterWithoutPage.attendeeId,
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

  const chatsData = data?.pages?.flatMap((page) => page.data);

  const paginationMeta = extractPaginationMeta(data?.pages?.[0]);

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

  const attendeeName = chatsData?.[0]?.attendeeName ?? undefined;
  const attendeeAvatar = chatsData?.[0]?.attendeeLogoUrl ?? undefined;
  const messages = chatsData?.flatMap((chat) => chat.messages) ?? EMPTY_ARRAY;
  const attendeeId = chatsData?.[0]?.attendeeId ?? '';

  return {
    handleFetchNextPage,
    handleFetchPreviousPage,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
    status,
    error,
    messages,
    attendee: attendeeName
      ? {
          name: attendeeName,
          avatar: attendeeAvatar,
          id: attendeeId
        }
      : undefined,
    paginationMeta
  };
};
