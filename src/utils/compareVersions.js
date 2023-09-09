export const compareVersions = (version1, version2) => {
  const parts1 = version1.split(".");
  const parts2 = version2.split(".");

  for (let i in parts1) {
    const part1 = parseInt(parts1[i]);
    const part2 = parseInt(parts2[i]);

    if (part1 > part2) {
      return 1;
    } else if (part1 < part2) {
      return -1;
    }
  }
  return 0;
};
