export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
      // eslint-disable-next-line no-useless-escape
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
      "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const setCookie = (
  name: string,
  value: string | number | boolean,
  props?: { [x: string]: any; expires?: any } | undefined
) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 20000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export const deleteCookie = (name: string) => {
  setCookie(name, '', { expires: -1 });
}