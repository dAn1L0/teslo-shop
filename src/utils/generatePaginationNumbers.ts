


export const generatePaginationNumbers = ( currentPage: number, totalPages: number) => {
  // Si el numero de totalPages es 7 o menos
  // no se pondrán los puntos suspensivos '...'
  if ( totalPages <= 7 ) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  //  si current page se encuentra entre las primeras 3 páginas
  //  se mostraran las primeras 3 páginas, puntos suspensivos y la última pagina
  if( currentPage <= 3 ) {
    return [1, 2, 3, 4, '...', totalPages - 1, totalPages];
  }
  // Si currentPage está entre las últimas tres páginas
  // mostrar las primaras 2,..., y las últimas tres páginas
  if( currentPage >= totalPages - 2 ) {
    return [1,2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  //  si currentPage está en medio 
  // mostrar la primera página, ..., y currentPage
  if( currentPage >= 3 && currentPage < totalPages - 2 ) {
    return [1, '...', currentPage - 1, currentPage, currentPage + 1 , '...', totalPages];
  }

}