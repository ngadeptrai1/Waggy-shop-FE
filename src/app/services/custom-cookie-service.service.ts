import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomCookieServiceService {

  
  constructor() { }

  getCookie(name: string): string | null {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  setCookie(name: string, value: string, options: any = {}): void {
    options = {
      path: '/',
      // thêm các options khác nếu cần
      ...options
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  replaceCookieDomain(): void {
    const cookieName = 'token';
    const oldDomain = 'authen-hkxg.onrender.com';
    const newDomain = 'waggy-petshop.netlify.app';

    const cookieValue = this.getCookie(cookieName);
    if (cookieValue) {
      // Xóa cookie cũ (thường cần path và domain chính xác để xóa cookie)
      this.setCookie(cookieName, "", { 'max-age': -1, domain: oldDomain });

      // Thiết lập cookie mới với domain mới
      this.setCookie(cookieName, cookieValue, { domain: newDomain, 'SameSite': 'None', 'Secure': true });
    }
  }
}
