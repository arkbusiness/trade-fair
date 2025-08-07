import { Table } from '@tanstack/react-table';
import { useSetParams } from './use-set-params';

interface IUseTablePagination<TData> {
  table: Table<TData>;
  manualPagination?: boolean;
  allowQueryParams?: boolean;
}

export const useTablePagination = <TData>({
  table,
  manualPagination = true,
  allowQueryParams = true
}: IUseTablePagination<TData>) => {
  const { setParam } = useSetParams();

  const handleScroll = () => {
    if (manualPagination) {
      window.scrollTo({
        top: 30,
        behavior: 'smooth'
      });
    }
  };

  const handleGoToPage = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
    if (allowQueryParams) {
      setParam('page', pageIndex === 0 ? '1' : pageIndex.toString());
    }
    table.resetSorting();
    handleScroll();
  };

  const handleGoToFirstPage = () => {
    table.setPageIndex(0);
    setParam('page', '1');
  };

  const handleGoToPrevPage = () => {
    const { pagination } = table.getState();
    const currentPage = pagination.pageIndex + 1;
    handleGoToPage(currentPage - 1);
    table.previousPage();
  };

  const handleGoToNextPage = () => {
    const { pagination } = table.getState();
    const currentPage = pagination.pageIndex + 1;
    handleGoToPage(currentPage + 1);
    table.nextPage();
  };

  const handleGoToLastPage = () => {
    const lastPageIndex = table.getPageCount();
    handleGoToPage(lastPageIndex);
  };

  return {
    handleGoToFirstPage,
    handleGoToPrevPage,
    handleGoToNextPage,
    handleGoToLastPage
  };
};
