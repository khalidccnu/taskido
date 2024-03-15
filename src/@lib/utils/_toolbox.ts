export const $$ = {
  generateKey: function (length: number, type?: 'lower' | 'upper' | 'numeric'): string {
    let result = '';
    const characters =
      type === 'lower'
        ? 'abcdefghijklmnopqrstuvwxyz'
        : type === 'upper'
          ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          : type === 'numeric'
            ? '0123456789'
            : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));

    return result;
  },

  sort: function (data: any[], sortBy: string, sortOrder: 'ASC' | 'DESC'): any[] {
    if (data?.length <= 0) return data;

    const sortByType = typeof data?.[0]?.[sortBy];

    if (sortByType === 'string') {
      if (sortOrder === 'ASC')
        return data.sort(function (a, b) {
          const prevElem = a[sortBy].toUpperCase();
          const nextElem = b[sortBy].toUpperCase();

          return prevElem < nextElem ? -1 : prevElem > nextElem ? 1 : 0;
        });

      return data.sort(function (a, b) {
        const prevElem = a[sortBy].toUpperCase();
        const nextElem = b[sortBy].toUpperCase();

        return prevElem < nextElem ? 1 : prevElem > nextElem ? -1 : 0;
      });
    }

    if (sortOrder === 'ASC') return data?.sort((a, b) => a[sortBy] - b[sortBy]);

    return data?.sort((a, b) => b[sortBy] - a[sortBy]);
  },
};
