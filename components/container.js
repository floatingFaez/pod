import { cx } from "@utils/all";

export default function Container({children,py,className,...rest}) {
  return (
    <div
      className={cx(
        `container py-${!!py?py:0} mx-auto px-5 max-w-screen-xl`,
        className
      )} {...rest}>
      {children}
    </div>
  );
}
