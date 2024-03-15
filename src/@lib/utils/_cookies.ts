export const cookies = {
  getData: function (name: string) {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie;
    const data = cookies?.split(`${name}=`)[1]?.split(';')[0];

    if (!data) return null;
    return JSON.parse(data);
  },

  setData: function (name: string, data: any, days: number = 30) {
    if (typeof window === 'undefined') return;

    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();

    data = JSON.stringify(data);
    document.cookie = `${name}=${data}; ${expires}; path=/`;
  },

  removeData: function (name: string) {
    if (typeof window === 'undefined') return;

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },

  clear: function () {
    if (typeof window === 'undefined') return;

    const cookies = document.cookie?.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const equalIndex = cookie.indexOf('=');
      const name = equalIndex > -1 ? cookie?.substring(0, equalIndex) : cookie;

      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    }
  },
};
