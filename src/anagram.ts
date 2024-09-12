export const isAnagram = (str1: string, str2: string) => {
  return formatStr(str1) === formatStr(str2);
};

function formatStr(str: string) {
  return str.replace(/[^\w]/g, "").toLowerCase().split("").sort().join("");
}

