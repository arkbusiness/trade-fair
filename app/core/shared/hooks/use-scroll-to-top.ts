import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useScrollToTop = () => {
  const pathname = usePathname();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
};
