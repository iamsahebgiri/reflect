import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: (s: number) => {
      return `${s}s ago`;
    },
    m: "1m ago",
    mm: "%dm ago",
    h: "1h ago",
    hh: "%dh ago",
    d: "1d ago",
    dd: "%dd ago",
    M: "1M ago",
    MM: "%dM ago",
    y: "1y ago",
    yy: "%dy ago",
  },
});

export default dayjs;
