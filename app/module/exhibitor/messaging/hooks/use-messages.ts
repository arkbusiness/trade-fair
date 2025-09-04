import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { clientAxios } from '@/app/core/shared/lib';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { messagingService } from '../services/messaging.service';

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

export const useAllMessages = (filter: Record<string, string> = {}) => {
  const fetchMessages = async ({
    pageParam = 1
  }: {
    pageParam?: number;
  }): Promise<IMessagesResponse> => {
    try {
      const response = await clientAxios({
        method: 'get',
        url: messagingService.getAllMessages({
          ...filter,
          page: pageParam.toString(),
          limit: '20'
        }).url
      });
      const responseData = response.data as IMessagesResponse;

      return responseData;
    } catch (error: unknown) {
      throw error;
    }
  };

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
    queryKey: messagingService.getAllMessages(filter).queryKey,
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
    if (paginationMeta.hasNext) {
      fetchNextPage();
    }
  };

  const handleFetchPreviousPage = () => {
    if (paginationMeta.hasPrev) {
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

export const useAttendeeMessages = (attendeeId: string) => {
  const fetchMessages = async ({
    pageParam = 1
  }: {
    pageParam?: number;
  }): Promise<IMessagesResponse> => {
    try {
      const response = await clientAxios({
        method: 'get',
        url: messagingService.getAllMessages({
          attendeeId,
          page: pageParam.toString(),
          limit: '5'
        }).url
      });
      const responseData = response.data as IMessagesResponse;

      return responseData;
    } catch (error: unknown) {
      throw error;
    }
  };

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
    queryKey: messagingService.getAttendeeMessages({ attendeeId }).queryKey,
    queryFn: fetchMessages,
    initialPageParam: 1,
    enabled: !!attendeeId,
    refetchInterval: 5000, // Refetch every 5 seconds
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
  const chatsData = chats?.data ?? [];

  const paginationMeta = extractPaginationMeta(chats);

  const handleFetchNextPage = () => {
    console.log(paginationMeta);
    if (paginationMeta.hasNext) {
      console.log('Fetching next page');
      fetchNextPage();
    }
  };

  const handleFetchPreviousPage = () => {
    if (paginationMeta.hasPrev) {
      console.log('Fetching previous page');
      fetchPreviousPage();
    }
  };

  const attendeeName = chatsData?.[0]?.attendeeName ?? undefined;
  const attendeeAvatar = chatsData?.[0]?.attendeeLogoUrl ?? undefined;
  const messages = chatsData?.[0]?.messages ?? EMPTY_ARRAY;

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
