import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { clientAxios } from '@/app/core/shared/lib';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { messagingService } from '../services/messaging.service';
import { useExhibitorUser } from '@/app/core/shared/hooks/api/use-exhibitor-user';

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
  const { user } = useExhibitorUser();
  const queryClient = useQueryClient();

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

  const addOptimisticMessage = (content: string) => {
    const queryKey = messagingService.getAttendeeMessages({
      attendeeId
    }).queryKey;

    // Create optimistic message
    const optimisticMessage: IMessage = {
      id: `temp-${Date.now()}`,
      senderType: 'EXHIBITOR',
      senderId: user?.id || '',
      receiverType: 'ATTENDEE',
      receiverId: attendeeId,
      content,
      createdAt: new Date().toISOString(),
      read: false,
      readAt: null,
      attachmentUrl: null,
      attachmentType: null
    };

    // Update the cache optimistically
    // eslint-disable-next-line
    queryClient.setQueryData(queryKey, (oldData: any) => {
      if (!oldData) return oldData;

      const newData = { ...oldData };
      const firstPage = newData.pages?.[0];

      if (firstPage?.data?.[0]) {
        // Add the optimistic message to the first attendee's messages
        const updatedAttendee = {
          ...firstPage.data[0],
          messages: [optimisticMessage, ...firstPage.data[0].messages]
        };

        newData.pages[0] = {
          ...firstPage,
          data: [updatedAttendee, ...firstPage.data.slice(1)]
        };
      }

      return newData;
    });

    return optimisticMessage.id; // Return temp ID for potential rollback
  };

  const removeOptimisticMessage = (tempId: string) => {
    const queryKey = messagingService.getAttendeeMessages({
      attendeeId
    }).queryKey;

    // eslint-disable-next-line
    queryClient.setQueryData(queryKey, (oldData: any) => {
      if (!oldData) return oldData;

      const newData = { ...oldData };
      const firstPage = newData.pages?.[0];

      if (firstPage?.data?.[0]) {
        // Remove the optimistic message with the temp ID
        const updatedAttendee = {
          ...firstPage.data[0],
          messages: firstPage.data[0].messages.filter(
            (msg: IMessage) => msg.id !== tempId
          )
        };

        newData.pages[0] = {
          ...firstPage,
          data: [updatedAttendee, ...firstPage.data.slice(1)]
        };
      }

      return newData;
    });
  };

  const chats = data?.pages?.[0];
  const chatsData = chats?.data ?? [];

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
    paginationMeta,
    addOptimisticMessage,
    removeOptimisticMessage
  };
};
