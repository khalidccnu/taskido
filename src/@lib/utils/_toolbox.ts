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
};
