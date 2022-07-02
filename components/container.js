import { cx } from "@utils/all";

export default function Container(props) {
  return (
    <div
      className={cx(
        `container px-8 py-${!!props.py?props.py:2} mx-auto xl:px-5 max-w-screen-xl`,
        props.className
      )}>
      {props.children}
    </div>
  );
}
