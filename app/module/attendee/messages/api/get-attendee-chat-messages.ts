import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { clientAxios } from '@/app/core/shared/lib';
import { CHAT_TAB } from '@/app/core/shared/slice';
import { IPaginatedResponse } from '@/app/core/shared/types';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';
import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
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

export const chatMessagesKey = {
  base: 'attendee-chat-messages',
  messages: (filter: Record<string, string>) =>
    [chatMessagesKey.base, filter] as const
};

const fetchMessages = async ({
  pageParam = 1,
  queryKey
}: QueryFunctionContext<
  readonly [string, Record<string, string>],
  number
>): Promise<IPaginatedResponse<MessagesResponse>> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, filter] = queryKey;

  const queryParams = buildQueryParams({
    params: {
      page: pageParam.toString(),
      limit: '50',
      unread: filter.unread === CHAT_TAB.UNREAD ? 'true' : '',
      exhibitorId: filter.exhibitorId
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

export const useAttendeeChatMessages = (
  filter: Record<string, string> = {}
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page, ...filterWithoutPage } = filter;

  const {
    data,
    isLoading,
    isRefetching,
    isPending,
    refetch,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: chatMessagesKey.messages(filterWithoutPage),
    queryFn: fetchMessages,
    enabled: !!filterWithoutPage.exhibitorId,
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

  const handleFetchPreviousPage = () => {
    if (hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  };

  const chatsData = data?.pages?.flatMap((page) => page.data);
  const messages = chatsData?.flatMap((chat) => chat.messages) ?? EMPTY_ARRAY;

  const exhibitorName = chatsData?.[0]?.exhibitorName || '';
  const exhibitorAvatar = chatsData?.[0]?.exhibitorLogoUrl || '';
  const exhibitorId = chatsData?.[0]?.exhibitorId || '';

  return {
    messages,
    chatsData: chatsData ?? EMPTY_ARRAY,
    exhibitor: exhibitorName
      ? {
          name: exhibitorName,
          avatar: exhibitorAvatar,
          id: exhibitorId
        }
      : undefined,
    paginationMeta,
    isLoading,
    isRefetching,
    isPending,
    refetch,
    handleFetchNextPage,
    handleFetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage
  };
};
