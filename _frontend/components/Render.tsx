import React, { Children, FC, ReactElement, ReactNode } from "react";

interface RenderProps {
  children: React.ReactNode;
}

interface RenderWhenProps {
  isTrue: boolean;
  children: ReactNode;
}

interface RenderElseProps {
  render?: ReactNode;
  children: ReactNode;
}

const Render: FC<RenderProps> & {
  When: FC<RenderWhenProps>;
  Else: FC<RenderElseProps>;
} = ({ children }) => {
  let when: ReactNode | null = null;
  let otherwise: ReactNode | null = null;

  Children.forEach(children, (child) => {
    // Type assertion to specify child as a ReactElement with optional props
    const element = child as ReactElement<{ isTrue?: boolean }>;
    if (element && element.props) {
      const { isTrue } = element.props;
      if (isTrue === undefined) {
        otherwise = element;
      } else if (!when && isTrue === true) {
        when = element;
      }
    }
  });

  return <>{when ?? otherwise}</>;
};

const RenderWhen: FC<RenderWhenProps> = ({ isTrue, children }) =>
  isTrue ? <>{children}</> : null;

const RenderElse: FC<RenderElseProps> = ({ render, children }) =>
  render ? <>{render}</> : <>{children}</>;

Render.When = RenderWhen;
Render.Else = RenderElse;

export default Render;
