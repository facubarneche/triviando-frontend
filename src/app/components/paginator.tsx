'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginatorProps {
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Paginator = ({ totalPages, onPageChange }: PaginatorProps) => {
  const FIRST_PAGE = 1;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const renderPageButtons = () => {
    const pages = [];

    let start = currentPage - 1;
    let end = currentPage + 1;

    // Asegurar que siempre se muestran 3 botones si es posible
    if (currentPage === FIRST_PAGE) {
      start = FIRST_PAGE;
      end = Math.min(3, totalPages);
    } else if (currentPage === totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - 2);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? 'default' : 'ghost'}
          onClick={() => handlePageChange(i)}
          className={`h-9 w-9 p-0 font-medium ${
            i === currentPage
              ? 'bg-purple-200 border-2 border-purple-600 text-purple-800'
              : 'hover:bg-purple-200'
          }`}
        >
          {i}
        </Button>,
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-6 py-3 px-4 rounded-xl shadow-md border bg-purple-100">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(FIRST_PAGE)}
        disabled={currentPage === FIRST_PAGE}
        className="h-9 w-9 p-0 text-purple-700 hover:bg-purple-200 disabled:opacity-50"
        aria-label="Primera página"
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === FIRST_PAGE}
        className="h-9 w-9 p-0 text-purple-700 hover:bg-purple-200 disabled:opacity-50"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="flex items-center space-x-1 mx-1">{renderPageButtons()}</div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 w-9 p-0 text-purple-700 hover:bg-purple-200 disabled:opacity-50"
        aria-label="Página siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="h-9 w-9 p-0 text-purple-700 hover:bg-purple-200 disabled:opacity-50"
        aria-label="Última página"
      >
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Paginator;
